from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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

# Gmail SMTP configuration
SMTP_EMAIL = os.environ.get('SMTP_EMAIL')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'vendezvotrecar@gmail.com')

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


async def send_estimation_notification(estimation: dict):
    """Send email notification for new estimation request via Gmail SMTP"""
    try:
        # Get vehicle state label
        state_labels = {
            'roule': 'Roule parfaitement',
            'roule_problemes': 'Roule avec des problèmes',
            'ne_roule_pas': 'Ne roule pas (panne)',
            'accident': 'Accidenté',
            'moteur_hs': 'Moteur HS',
            'sans_ct': 'Sans contrôle technique',
            'autre': 'Autre'
        }
        
        fuel_labels = {
            'essence': 'Essence',
            'diesel': 'Diesel',
            'hybride': 'Hybride',
            'electrique': 'Électrique',
            'gpl': 'GPL'
        }
        
        gearbox_labels = {
            'manuelle': 'Manuelle',
            'automatique': 'Automatique'
        }
        
        etat_label = state_labels.get(estimation.get('etat', ''), estimation.get('etat', ''))
        carburant_label = fuel_labels.get(estimation.get('carburant', ''), estimation.get('carburant', ''))
        boite_label = gearbox_labels.get(estimation.get('boite', ''), estimation.get('boite', ''))
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #2563EB; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0;">Nouvelle demande de rachat</h1>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border: 1px solid #e9ecef;">
                <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">Informations du véhicule</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #666;">Marque / Modèle</td><td style="padding: 8px 0; font-weight: bold;">{estimation.get('marque', '')} {estimation.get('modele', '')}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Année</td><td style="padding: 8px 0; font-weight: bold;">{estimation.get('annee', '')}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Kilométrage</td><td style="padding: 8px 0; font-weight: bold;">{estimation.get('kilometrage', '')} km</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">État</td><td style="padding: 8px 0; font-weight: bold; color: #F97316;">{etat_label}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Carburant</td><td style="padding: 8px 0; font-weight: bold;">{carburant_label}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Boîte</td><td style="padding: 8px 0; font-weight: bold;">{boite_label}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Immatriculation</td><td style="padding: 8px 0; font-weight: bold;">{estimation.get('immatriculation', 'Non renseignée')}</td></tr>
                </table>
                
                <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px; margin-top: 30px;">Coordonnées du vendeur</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #666;">Nom</td><td style="padding: 8px 0; font-weight: bold;">{estimation.get('nom', '')}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Téléphone</td><td style="padding: 8px 0; font-weight: bold; color: #2563EB;">{estimation.get('telephone', '')}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; font-weight: bold;">{estimation.get('email', '')}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Localisation</td><td style="padding: 8px 0; font-weight: bold;">{estimation.get('code_postal', '')} {estimation.get('ville', '')}</td></tr>
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-radius: 8px; border-left: 4px solid #F97316;">
                    <p style="margin: 0; color: #666;">Photos jointes: <strong>{len(estimation.get('photos', []))}</strong></p>
                    <p style="margin: 5px 0 0 0; color: #666;">Référence: <strong>{estimation.get('id', '')[:8].upper()}</strong></p>
                </div>
            </div>
            
            <div style="background-color: #2563EB; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
                <p style="margin: 0; font-size: 14px;">VendezVotreCar - Rachat de véhicules en Belgique</p>
            </div>
        </body>
        </html>
        """
        
        subject = f"Nouvelle demande: {estimation.get('marque', '')} {estimation.get('modele', '')} - {estimation.get('nom', '')}"
        
        await asyncio.to_thread(send_email_smtp, subject, html_content)
        logger.info(f"Email notification sent for estimation {estimation.get('id', '')}")
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")


async def send_contact_notification(contact: dict):
    """Send email notification for new contact message"""
    try:
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #2563EB; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0;">📩 Nouveau message de contact</h1>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border: 1px solid #e9ecef;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #666;">Nom</td><td style="padding: 8px 0; font-weight: bold;">{contact.get('nom', '')}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; font-weight: bold;"><a href="mailto:{contact.get('email', '')}" style="color: #2563EB;">{contact.get('email', '')}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">Téléphone</td><td style="padding: 8px 0; font-weight: bold;">{contact.get('telephone', 'Non renseigné')}</td></tr>
                </table>
                
                <h3 style="color: #2563EB; margin-top: 20px;">Message:</h3>
                <div style="background-color: #fff; padding: 15px; border-radius: 8px; border-left: 4px solid #2563EB;">
                    <p style="margin: 0; white-space: pre-wrap;">{contact.get('message', '')}</p>
                </div>
            </div>
            
            <div style="background-color: #2563EB; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
                <p style="margin: 0; font-size: 14px;">VendezVotreCar - Rachat de véhicules en Belgique</p>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"📩 Nouveau message de {contact.get('nom', '')}",
            "html": html_content
        }
        
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Contact email notification sent for {contact.get('id', '')}")
    except Exception as e:
        logger.error(f"Failed to send contact email notification: {str(e)}")

@api_router.post("/estimations", response_model=EstimationResponse)
async def create_estimation(estimation: EstimationCreate):
    """Create a new vehicle estimation request"""
    if not estimation.rgpd_consent:
        raise HTTPException(status_code=400, detail="Le consentement RGPD est obligatoire")
    
    estimation_obj = EstimationRequest(**estimation.model_dump())
    doc = estimation_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.estimations.insert_one(doc)
    
    # Send email notification (non-blocking)
    asyncio.create_task(send_estimation_notification(doc))
    
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
    
    # Send email notification (non-blocking)
    asyncio.create_task(send_contact_notification(doc))
    
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
