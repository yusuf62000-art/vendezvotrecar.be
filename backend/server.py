from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class EstimationRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    # Vehicle info
    marque: str
    modele: str
    annee: str
    kilometrage: str
    etat: str  # roule, ne_roule_pas, panne, accident, autres
    carburant: str
    boite: str
    immatriculation: Optional[str] = None
    # Contact info
    nom: str
    telephone: str
    email: EmailStr
    code_postal: str
    ville: str
    # RGPD
    rgpd_consent: bool
    # Photos (stored as base64 strings)
    photos: Optional[List[str]] = []
    # Metadata
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "nouveau"  # nouveau, contacte, traite, refuse

class EstimationCreate(BaseModel):
    marque: str
    modele: str
    annee: str
    kilometrage: str
    etat: str
    carburant: str
    boite: str
    immatriculation: Optional[str] = None
    nom: str
    telephone: str
    email: EmailStr
    code_postal: str
    ville: str
    rgpd_consent: bool
    photos: Optional[List[str]] = []

class EstimationResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    marque: str
    modele: str
    annee: str
    kilometrage: str
    etat: str
    carburant: str
    boite: str
    immatriculation: Optional[str] = None
    nom: str
    telephone: str
    email: str
    code_postal: str
    ville: str
    rgpd_consent: bool
    photos: Optional[List[str]] = []
    created_at: datetime
    status: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    email: EmailStr
    telephone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    nom: str
    email: EmailStr
    telephone: Optional[str] = None
    message: str


# API Routes
@api_router.get("/")
async def root():
    return {"message": "VendezVotreCar API"}

@api_router.post("/estimations", response_model=EstimationResponse)
async def create_estimation(estimation: EstimationCreate):
    """Create a new vehicle estimation request"""
    if not estimation.rgpd_consent:
        raise HTTPException(status_code=400, detail="Le consentement RGPD est obligatoire")
    
    estimation_obj = EstimationRequest(**estimation.model_dump())
    doc = estimation_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.estimations.insert_one(doc)
    
    # Return the created estimation
    return EstimationResponse(**estimation_obj.model_dump())

@api_router.get("/estimations", response_model=List[EstimationResponse])
async def get_estimations():
    """Get all estimation requests"""
    estimations = await db.estimations.find({}, {"_id": 0}).to_list(1000)
    
    for est in estimations:
        if isinstance(est.get('created_at'), str):
            est['created_at'] = datetime.fromisoformat(est['created_at'])
    
    return estimations

@api_router.get("/estimations/{estimation_id}", response_model=EstimationResponse)
async def get_estimation(estimation_id: str):
    """Get a specific estimation by ID"""
    estimation = await db.estimations.find_one({"id": estimation_id}, {"_id": 0})
    if not estimation:
        raise HTTPException(status_code=404, detail="Estimation non trouvée")
    
    if isinstance(estimation.get('created_at'), str):
        estimation['created_at'] = datetime.fromisoformat(estimation['created_at'])
    
    return estimation

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(contact: ContactCreate):
    """Create a new contact message"""
    contact_obj = ContactMessage(**contact.model_dump())
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contacts():
    """Get all contact messages"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    
    for contact in contacts:
        if isinstance(contact.get('created_at'), str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    
    return contacts

# Stats endpoint for admin
@api_router.get("/stats")
async def get_stats():
    """Get dashboard statistics"""
    total_estimations = await db.estimations.count_documents({})
    new_estimations = await db.estimations.count_documents({"status": "nouveau"})
    total_contacts = await db.contacts.count_documents({})
    
    return {
        "total_estimations": total_estimations,
        "new_estimations": new_estimations,
        "total_contacts": total_contacts
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
