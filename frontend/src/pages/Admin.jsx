import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Lock,
  Search,
  Filter,
  Trash2,
  Eye,
  X,
  ChevronDown,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  Euro
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Admin = () => {
  const { secretPath } = useParams();
  const navigate = useNavigate();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  
  // Data state
  const [estimations, setEstimations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [stats, setStats] = useState({ total: 0, nouveau: 0 });
  
  // Filter state
  const [filters, setFilters] = useState({
    status: 'tous',
    ville: '',
    search: ''
  });
  
  // Modal state
  const [selectedEstimation, setSelectedEstimation] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const statusLabels = {
    'nouveau': { label: 'Nouveau', color: 'bg-blue-100 text-blue-800', icon: Clock },
    'contacte': { label: 'Contacté', color: 'bg-yellow-100 text-yellow-800', icon: Phone },
    'traite': { label: 'Traité', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'refuse': { label: 'Refusé', color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const stateLabels = {
    'roule': 'Roule parfaitement',
    'roule_problemes': 'Roule avec problèmes',
    'ne_roule_pas': 'Ne roule pas',
    'accident': 'Accidenté',
    'moteur_hs': 'Moteur HS',
    'sans_ct': 'Sans CT',
    'autre': 'Autre'
  };

  const delaiLabels = {
    'immediat': 'Immédiatement',
    '1_semaine': 'Sous 1 semaine',
    '2_semaines': 'Sous 2 semaines',
    '1_mois': 'Sous 1 mois',
    'pas_presse': 'Pas pressé'
  };

  // Check secret path
  useEffect(() => {
    if (secretPath !== 'vvc-secret-2026') {
      navigate('/');
    }
  }, [secretPath, navigate]);

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchEstimations();
      fetchCities();
    }
  }, [isAuthenticated, filters.status, filters.ville]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      await axios.post(`${API}/admin/login`, { password });
      setIsAuthenticated(true);
      toast.success('Bienvenue dans l\'espace admin');
    } catch (err) {
      toast.error('Mot de passe incorrect');
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchEstimations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status !== 'tous') params.append('status', filters.status);
      if (filters.ville) params.append('ville', filters.ville);
      
      console.log('Fetching estimations from:', `${API}/admin/estimations?${params}`);
      const response = await axios.get(`${API}/admin/estimations?${params}`);
      console.log('Response:', response.data);
      setEstimations(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const nouveau = response.data.filter(e => e.status === 'nouveau').length;
      setStats({ total, nouveau });
    } catch (err) {
      console.error('Error fetching estimations:', err);
      console.error('API URL used:', API);
      toast.error('Erreur lors du chargement: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${API}/admin/cities`);
      setCities(response.data);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API}/admin/estimations/${id}/status`, { status: newStatus });
      toast.success('Statut mis à jour');
      fetchEstimations();
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const deleteEstimation = async (id) => {
    try {
      await axios.delete(`${API}/admin/estimations/${id}`);
      toast.success('Demande supprimée');
      setDeleteConfirm(null);
      setSelectedEstimation(null);
      fetchEstimations();
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const filteredEstimations = estimations.filter(est => {
    if (!filters.search) return true;
    const search = filters.search.toLowerCase();
    return (
      est.marque?.toLowerCase().includes(search) ||
      est.modele?.toLowerCase().includes(search) ||
      est.nom?.toLowerCase().includes(search) ||
      est.telephone?.includes(search) ||
      est.email?.toLowerCase().includes(search)
    );
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Espace Admin</CardTitle>
            <p className="text-gray-500 mt-2">VendezVotreCar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  data-testid="admin-password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-brand-primary hover:bg-blue-700"
                disabled={authLoading}
                data-testid="admin-login-btn"
              >
                {authLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Connexion
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100" data-testid="admin-dashboard">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-500">Gestion des demandes de rachat</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-brand-primary">{stats.total}</p>
              <p className="text-sm text-gray-500">demandes</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{stats.nouveau}</p>
              <p className="text-sm text-gray-500">nouvelles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <Label className="text-xs text-gray-500 mb-1">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Marque, modèle, nom, téléphone..."
                    value={filters.search}
                    onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                    className="pl-10"
                    data-testid="filter-search"
                  />
                </div>
              </div>
              
              <div className="w-[160px]">
                <Label className="text-xs text-gray-500 mb-1">Statut</Label>
                <Select value={filters.status} onValueChange={(v) => setFilters(f => ({ ...f, status: v }))}>
                  <SelectTrigger data-testid="filter-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous</SelectItem>
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                    <SelectItem value="contacte">Contacté</SelectItem>
                    <SelectItem value="traite">Traité</SelectItem>
                    <SelectItem value="refuse">Refusé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-[160px]">
                <Label className="text-xs text-gray-500 mb-1">Ville</Label>
                <Select value={filters.ville || 'toutes'} onValueChange={(v) => setFilters(f => ({ ...f, ville: v === 'toutes' ? '' : v }))}>
                  <SelectTrigger data-testid="filter-ville">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toutes">Toutes</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setFilters({ status: 'tous', ville: '', search: '' })}
              >
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
          </div>
        ) : filteredEstimations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Car className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucune demande trouvée</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredEstimations.map((est) => {
              const StatusIcon = statusLabels[est.status]?.icon || Clock;
              return (
                <Card 
                  key={est.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleOpenEstimation(est)}
                  data-testid={`estimation-card-${est.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Photo thumbnail placeholder */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <Car className="h-8 w-8 text-gray-300" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg truncate">
                            {est.marque} {est.modele}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusLabels[est.status]?.color}`}>
                            {statusLabels[est.status]?.label}
                          </span>
                          {est.photos && est.photos.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 flex items-center gap-1">
                              <Camera className="h-3 w-3" />
                              {est.photos.length}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                          <span>{est.annee} • {parseInt(est.kilometrage).toLocaleString()} km</span>
                          <span className="text-orange-600 font-medium">{stateLabels[est.etat]}</span>
                          {est.prix_souhaite && (
                            <span className="text-green-600 font-medium">{parseInt(est.prix_souhaite).toLocaleString()} €</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {est.nom}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {est.telephone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {est.code_postal} {est.ville}
                          </span>
                        </div>
                      </div>
                      
                      {/* Date & Actions */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-400 mb-2">{formatDate(est.created_at)}</p>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="h-3 w-3" />
                          Voir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEstimation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedEstimation.marque} {selectedEstimation.modele}
                </h2>
                <p className="text-gray-500 text-sm">
                  Ref: #{selectedEstimation.id?.slice(0, 8).toUpperCase()} • {formatDate(selectedEstimation.created_at)}
                </p>
              </div>
              <button 
                onClick={() => setSelectedEstimation(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Status & Actions */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <Label className="text-xs text-gray-500 mb-1">Statut</Label>
                  <Select 
                    value={selectedEstimation.status} 
                    onValueChange={(v) => updateStatus(selectedEstimation.id, v)}
                  >
                    <SelectTrigger data-testid="modal-status-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nouveau">🔵 Nouveau</SelectItem>
                      <SelectItem value="contacte">🟡 Contacté</SelectItem>
                      <SelectItem value="traite">🟢 Traité</SelectItem>
                      <SelectItem value="refuse">🔴 Refusé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-2">
                  <a href={`tel:${selectedEstimation.telephone}`}>
                    <Button className="bg-brand-primary hover:bg-blue-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                  </a>
                  <a href={`mailto:${selectedEstimation.email}`}>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </a>
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => setDeleteConfirm(selectedEstimation.id)}
                    data-testid="delete-btn"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Photos */}
              {selectedEstimation.photos && selectedEstimation.photos.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-brand-primary" />
                    Photos ({selectedEstimation.photos.length})
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {selectedEstimation.photos.map((photo, idx) => (
                      <div 
                        key={idx}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Vehicle Info */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5 text-brand-primary" />
                    Véhicule
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Marque / Modèle</span>
                      <span className="font-medium">{selectedEstimation.marque} {selectedEstimation.modele}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Année</span>
                      <span className="font-medium">{selectedEstimation.annee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Kilométrage</span>
                      <span className="font-medium">{parseInt(selectedEstimation.kilometrage).toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">État</span>
                      <span className="font-medium text-orange-600">{stateLabels[selectedEstimation.etat]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Carburant</span>
                      <span className="font-medium capitalize">{selectedEstimation.carburant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Boîte</span>
                      <span className="font-medium capitalize">{selectedEstimation.boite}</span>
                    </div>
                    {selectedEstimation.immatriculation && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Immatriculation</span>
                        <span className="font-medium">{selectedEstimation.immatriculation}</span>
                      </div>
                    )}
                    {selectedEstimation.prix_souhaite && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Prix souhaité</span>
                        <span className="font-medium text-green-600">{parseInt(selectedEstimation.prix_souhaite).toLocaleString()} €</span>
                      </div>
                    )}
                    {selectedEstimation.delai_vente && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Délai de vente</span>
                        <span className="font-medium">{delaiLabels[selectedEstimation.delai_vente]}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-brand-primary" />
                    Contact
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nom</span>
                      <span className="font-medium">{selectedEstimation.nom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Téléphone</span>
                      <a href={`tel:${selectedEstimation.telephone}`} className="font-medium text-brand-primary hover:underline">
                        {selectedEstimation.telephone}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <a href={`mailto:${selectedEstimation.email}`} className="font-medium text-brand-primary hover:underline">
                        {selectedEstimation.email}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Localisation</span>
                      <span className="font-medium">{selectedEstimation.code_postal} {selectedEstimation.ville}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Photo agrandie"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Supprimer cette demande ?</h3>
              <p className="text-gray-500 mb-6">Cette action est irréversible.</p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                  Annuler
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => deleteEstimation(deleteConfirm)}
                  data-testid="confirm-delete-btn"
                >
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;
