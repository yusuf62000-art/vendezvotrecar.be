import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Car, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Camera,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ViewEstimation = () => {
  const { id } = useParams();
  const [estimation, setEstimation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const stateLabels = {
    'roule': 'Roule parfaitement',
    'roule_problemes': 'Roule avec des problèmes',
    'ne_roule_pas': 'Ne roule pas (panne)',
    'accident': 'Accidenté',
    'moteur_hs': 'Moteur HS',
    'sans_ct': 'Sans contrôle technique',
    'autre': 'Autre'
  };

  const fuelLabels = {
    'essence': 'Essence',
    'diesel': 'Diesel',
    'hybride': 'Hybride',
    'electrique': 'Électrique',
    'gpl': 'GPL'
  };

  const gearboxLabels = {
    'manuelle': 'Manuelle',
    'automatique': 'Automatique'
  };

  const delaiLabels = {
    'immediat': 'Immédiatement',
    '1_semaine': 'Sous 1 semaine',
    '2_semaines': 'Sous 2 semaines',
    '1_mois': 'Sous 1 mois',
    'pas_presse': 'Pas pressé'
  };

  useEffect(() => {
    const fetchEstimation = async () => {
      try {
        const response = await axios.get(`${API}/estimations/${id}`);
        setEstimation(response.data);
      } catch (err) {
        setError('Demande non trouvée');
      } finally {
        setLoading(false);
      }
    };

    fetchEstimation();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (error || !estimation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">{error || 'Demande non trouvée'}</p>
            <Link to="/">
              <Button variant="outline">Retour à l'accueil</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" data-testid="view-estimation-page">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-brand-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
            Demande #{estimation.id?.slice(0, 8).toUpperCase()}
          </h1>
          <p className="text-gray-500 mt-1">
            {estimation.marque} {estimation.modele} - {estimation.annee}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vehicle Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Car className="h-5 w-5 text-brand-primary" />
                Informations du véhicule
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Marque / Modèle</span>
                  <span className="font-medium">{estimation.marque} {estimation.modele}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Année
                  </span>
                  <span className="font-medium">{estimation.annee}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Gauge className="h-4 w-4" /> Kilométrage
                  </span>
                  <span className="font-medium">{parseInt(estimation.kilometrage).toLocaleString()} km</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">État</span>
                  <span className="font-medium text-orange-600">{stateLabels[estimation.etat] || estimation.etat}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Fuel className="h-4 w-4" /> Carburant
                  </span>
                  <span className="font-medium">{fuelLabels[estimation.carburant] || estimation.carburant}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Boîte
                  </span>
                  <span className="font-medium">{gearboxLabels[estimation.boite] || estimation.boite}</span>
                </div>
                {estimation.immatriculation && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Immatriculation</span>
                    <span className="font-medium">{estimation.immatriculation}</span>
                  </div>
                )}
                {estimation.prix_souhaite && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Prix souhaité</span>
                    <span className="font-medium text-green-600">{parseInt(estimation.prix_souhaite).toLocaleString()} €</span>
                  </div>
                )}
                {estimation.delai_vente && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Délai de vente</span>
                    <span className="font-medium">{delaiLabels[estimation.delai_vente] || estimation.delai_vente}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-brand-primary" />
                Coordonnées du vendeur
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Nom</span>
                  <span className="font-medium">{estimation.nom}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Téléphone
                  </span>
                  <a href={`tel:${estimation.telephone}`} className="font-medium text-brand-primary hover:underline">
                    {estimation.telephone}
                  </a>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </span>
                  <a href={`mailto:${estimation.email}`} className="font-medium text-brand-primary hover:underline">
                    {estimation.email}
                  </a>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Localisation
                  </span>
                  <span className="font-medium">{estimation.code_postal} {estimation.ville}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex gap-3">
                <a href={`tel:${estimation.telephone}`} className="flex-1">
                  <Button className="w-full bg-brand-primary hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                </a>
                <a href={`mailto:${estimation.email}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Photos */}
        {estimation.photos && estimation.photos.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5 text-brand-primary" />
                Photos ({estimation.photos.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {estimation.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img 
                      src={photo} 
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <img 
              src={selectedPhoto} 
              alt="Photo agrandie"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEstimation;
