import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Car, 
  User, 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  X,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const carBrands = [
  'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 
  'Kia', 'Mercedes', 'Nissan', 'Opel', 'Peugeot', 'Renault', 'Seat', 
  'Skoda', 'Toyota', 'Volkswagen', 'Volvo', 'Autre'
];

const years = Array.from({ length: 35 }, (_, i) => (new Date().getFullYear() - i).toString());

const fuelTypes = [
  { value: 'essence', label: 'Essence' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hybride', label: 'Hybride' },
  { value: 'electrique', label: 'Électrique' },
  { value: 'gpl', label: 'GPL' },
];

const gearboxTypes = [
  { value: 'manuelle', label: 'Manuelle' },
  { value: 'automatique', label: 'Automatique' },
];

const vehicleStates = [
  { value: 'roule', label: 'Roule parfaitement' },
  { value: 'roule_problemes', label: 'Roule avec des problèmes' },
  { value: 'ne_roule_pas', label: 'Ne roule pas (panne)' },
  { value: 'accident', label: 'Accidenté' },
  { value: 'moteur_hs', label: 'Moteur HS' },
  { value: 'sans_ct', label: 'Sans contrôle technique' },
  { value: 'autre', label: 'Autre' },
];

const delaiVenteOptions = [
  { value: 'immediat', label: 'Immédiatement' },
  { value: '1_semaine', label: 'Sous 1 semaine' },
  { value: '2_semaines', label: 'Sous 2 semaines' },
  { value: '1_mois', label: 'Sous 1 mois' },
  { value: 'pas_presse', label: 'Pas pressé' },
];

const Estimation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Vehicle info
    marque: '',
    modele: '',
    annee: '',
    kilometrage: '',
    etat: '',
    carburant: '',
    boite: '',
    immatriculation: '',
    prix_souhaite: '',
    delai_vente: '',
    // Step 2: Photos
    photos: [],
    // Step 3: Contact
    nom: '',
    telephone: '',
    email: '',
    code_postal: '',
    ville: '',
    rgpd_consent: false,
  });

  const [errors, setErrors] = useState({});

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 10) {
      toast.error('Maximum 10 photos autorisées');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.marque) newErrors.marque = 'Requis';
      if (!formData.modele) newErrors.modele = 'Requis';
      if (!formData.annee) newErrors.annee = 'Requis';
      if (!formData.kilometrage) newErrors.kilometrage = 'Requis';
      if (!formData.etat) newErrors.etat = 'Requis';
      if (!formData.carburant) newErrors.carburant = 'Requis';
      if (!formData.boite) newErrors.boite = 'Requis';
    }

    if (step === 3) {
      if (!formData.nom) newErrors.nom = 'Requis';
      if (!formData.telephone) newErrors.telephone = 'Requis';
      if (!formData.email) newErrors.email = 'Requis';
      if (!formData.code_postal) newErrors.code_postal = 'Requis';
      if (!formData.ville) newErrors.ville = 'Requis';
      if (!formData.rgpd_consent) newErrors.rgpd_consent = 'Vous devez accepter';
      
      // Email validation
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      // Phone validation (Belgian format)
      if (formData.telephone && !/^[0-9+\s]{9,15}$/.test(formData.telephone.replace(/\s/g, ''))) {
        newErrors.telephone = 'Numéro invalide';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitForm = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API}/estimations`, formData);
      if (response.data) {
        navigate('/merci', { state: { estimation: response.data } });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIcons = [
    { icon: Car, label: 'Véhicule' },
    { icon: Camera, label: 'Photos' },
    { icon: User, label: 'Contact' },
    { icon: CheckCircle2, label: 'Confirmation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12" data-testid="estimation-page">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Estimation gratuite
          </h1>
          <p className="text-gray-600">Remplissez le formulaire pour recevoir votre offre</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {stepIcons.map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center ${
                  index + 1 <= currentStep ? 'text-brand-primary' : 'text-gray-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                  index + 1 <= currentStep ? 'bg-brand-primary text-white' : 'bg-gray-200'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs hidden sm:block">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardContent className="p-6 sm:p-8">
            {/* Step 1: Vehicle Info */}
            {currentStep === 1 && (
              <div className="space-y-6" data-testid="step-1">
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                  Informations sur votre véhicule
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="marque">Marque *</Label>
                    <Select value={formData.marque} onValueChange={(v) => updateFormData('marque', v)}>
                      <SelectTrigger id="marque" data-testid="input-marque" className={errors.marque ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {carBrands.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.marque && <p className="text-red-500 text-xs mt-1">{errors.marque}</p>}
                  </div>

                  <div>
                    <Label htmlFor="modele">Modèle *</Label>
                    <Input
                      id="modele"
                      data-testid="input-modele"
                      value={formData.modele}
                      onChange={(e) => updateFormData('modele', e.target.value)}
                      placeholder="Ex: Clio, Golf, 308..."
                      className={errors.modele ? 'border-red-500' : ''}
                    />
                    {errors.modele && <p className="text-red-500 text-xs mt-1">{errors.modele}</p>}
                  </div>

                  <div>
                    <Label htmlFor="annee">Année *</Label>
                    <Select value={formData.annee} onValueChange={(v) => updateFormData('annee', v)}>
                      <SelectTrigger id="annee" data-testid="input-annee" className={errors.annee ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.annee && <p className="text-red-500 text-xs mt-1">{errors.annee}</p>}
                  </div>

                  <div>
                    <Label htmlFor="kilometrage">Kilométrage *</Label>
                    <Input
                      id="kilometrage"
                      data-testid="input-kilometrage"
                      type="number"
                      value={formData.kilometrage}
                      onChange={(e) => updateFormData('kilometrage', e.target.value)}
                      placeholder="Ex: 150000"
                      className={errors.kilometrage ? 'border-red-500' : ''}
                    />
                    {errors.kilometrage && <p className="text-red-500 text-xs mt-1">{errors.kilometrage}</p>}
                  </div>

                  <div>
                    <Label htmlFor="carburant">Carburant *</Label>
                    <Select value={formData.carburant} onValueChange={(v) => updateFormData('carburant', v)}>
                      <SelectTrigger id="carburant" data-testid="input-carburant" className={errors.carburant ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map(fuel => (
                          <SelectItem key={fuel.value} value={fuel.value}>{fuel.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.carburant && <p className="text-red-500 text-xs mt-1">{errors.carburant}</p>}
                  </div>

                  <div>
                    <Label htmlFor="boite">Boîte de vitesse *</Label>
                    <Select value={formData.boite} onValueChange={(v) => updateFormData('boite', v)}>
                      <SelectTrigger id="boite" data-testid="input-boite" className={errors.boite ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {gearboxTypes.map(gearbox => (
                          <SelectItem key={gearbox.value} value={gearbox.value}>{gearbox.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.boite && <p className="text-red-500 text-xs mt-1">{errors.boite}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="etat">État du véhicule *</Label>
                  <Select value={formData.etat} onValueChange={(v) => updateFormData('etat', v)}>
                    <SelectTrigger id="etat" data-testid="input-etat" className={errors.etat ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Sélectionnez l'état actuel" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleStates.map(state => (
                        <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.etat && <p className="text-red-500 text-xs mt-1">{errors.etat}</p>}
                </div>

                <div>
                  <Label htmlFor="immatriculation">Immatriculation (optionnel)</Label>
                  <Input
                    id="immatriculation"
                    data-testid="input-immatriculation"
                    value={formData.immatriculation}
                    onChange={(e) => updateFormData('immatriculation', e.target.value)}
                    placeholder="Ex: 1-ABC-123"
                  />
                </div>

                <div>
                  <Label htmlFor="prix_souhaite">Prix souhaité (optionnel)</Label>
                  <div className="relative">
                    <Input
                      id="prix_souhaite"
                      data-testid="input-prix-souhaite"
                      type="number"
                      value={formData.prix_souhaite}
                      onChange={(e) => updateFormData('prix_souhaite', e.target.value)}
                      placeholder="Ex: 5000"
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="delai_vente">Quand souhaitez-vous vendre ? (optionnel)</Label>
                  <Select value={formData.delai_vente} onValueChange={(v) => updateFormData('delai_vente', v)}>
                    <SelectTrigger id="delai_vente" data-testid="input-delai-vente">
                      <SelectValue placeholder="Sélectionnez un délai" />
                    </SelectTrigger>
                    <SelectContent>
                      {delaiVenteOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {currentStep === 2 && (
              <div className="space-y-6" data-testid="step-2">
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                  Photos de votre véhicule (optionnel)
                </h2>
                <p className="text-gray-600 text-sm">
                  Ajoutez jusqu'à 10 photos pour une estimation plus précise
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-primary transition-colors">
                  <input
                    type="file"
                    id="photos"
                    data-testid="input-photos"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label htmlFor="photos" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Cliquez ou glissez vos photos ici</p>
                    <p className="text-gray-400 text-sm">PNG, JPG jusqu'à 5MB chacune</p>
                  </label>
                </div>

                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={photo} 
                          alt={`Photo ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          data-testid={`remove-photo-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact */}
            {currentStep === 3 && (
              <div className="space-y-6" data-testid="step-3">
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                  Vos coordonnées
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="nom">Nom complet *</Label>
                    <Input
                      id="nom"
                      data-testid="input-nom"
                      value={formData.nom}
                      onChange={(e) => updateFormData('nom', e.target.value)}
                      placeholder="Votre nom et prénom"
                      className={errors.nom ? 'border-red-500' : ''}
                    />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                  </div>

                  <div>
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      data-testid="input-telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => updateFormData('telephone', e.target.value)}
                      placeholder="04XX XX XX XX"
                      className={errors.telephone ? 'border-red-500' : ''}
                    />
                    {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      data-testid="input-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="votre@email.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="code_postal">Code postal *</Label>
                    <Input
                      id="code_postal"
                      data-testid="input-code-postal"
                      value={formData.code_postal}
                      onChange={(e) => updateFormData('code_postal', e.target.value)}
                      placeholder="1000"
                      className={errors.code_postal ? 'border-red-500' : ''}
                    />
                    {errors.code_postal && <p className="text-red-500 text-xs mt-1">{errors.code_postal}</p>}
                  </div>

                  <div>
                    <Label htmlFor="ville">Ville *</Label>
                    <Input
                      id="ville"
                      data-testid="input-ville"
                      value={formData.ville}
                      onChange={(e) => updateFormData('ville', e.target.value)}
                      placeholder="Bruxelles"
                      className={errors.ville ? 'border-red-500' : ''}
                    />
                    {errors.ville && <p className="text-red-500 text-xs mt-1">{errors.ville}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox
                    id="rgpd_consent"
                    data-testid="input-rgpd"
                    checked={formData.rgpd_consent}
                    onCheckedChange={(checked) => updateFormData('rgpd_consent', checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="rgpd_consent" className="text-sm font-normal cursor-pointer">
                      J'accepte que mes données soient utilisées pour traiter ma demande de rachat. *
                    </Label>
                    <p className="text-xs text-gray-500">
                      Consultez notre <a href="/confidentialite" className="text-brand-primary hover:underline">politique de confidentialité</a>
                    </p>
                    {errors.rgpd_consent && <p className="text-red-500 text-xs">{errors.rgpd_consent}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6" data-testid="step-4">
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                  Récapitulatif de votre demande
                </h2>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Véhicule</span>
                      <p className="font-medium">{formData.marque} {formData.modele}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Année</span>
                      <p className="font-medium">{formData.annee}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Kilométrage</span>
                      <p className="font-medium">{parseInt(formData.kilometrage).toLocaleString()} km</p>
                    </div>
                    <div>
                      <span className="text-gray-500">État</span>
                      <p className="font-medium">{vehicleStates.find(s => s.value === formData.etat)?.label}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Carburant</span>
                      <p className="font-medium">{fuelTypes.find(f => f.value === formData.carburant)?.label}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Boîte</span>
                      <p className="font-medium">{gearboxTypes.find(g => g.value === formData.boite)?.label}</p>
                    </div>
                    {formData.prix_souhaite && (
                      <div>
                        <span className="text-gray-500">Prix souhaité</span>
                        <p className="font-medium text-green-600">{parseInt(formData.prix_souhaite).toLocaleString()} €</p>
                      </div>
                    )}
                  </div>

                  <hr className="border-gray-200" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Nom</span>
                      <p className="font-medium">{formData.nom}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Téléphone</span>
                      <p className="font-medium">{formData.telephone}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email</span>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Localisation</span>
                      <p className="font-medium">{formData.code_postal} {formData.ville}</p>
                    </div>
                  </div>

                  {formData.photos.length > 0 && (
                    <>
                      <hr className="border-gray-200" />
                      <div>
                        <span className="text-gray-500 text-sm">{formData.photos.length} photo(s) jointe(s)</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-brand-light rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Nous vous rappelons sous 2 heures</p>
                    <p className="text-sm text-gray-600">Du lundi au samedi, de 9h à 19h</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  data-testid="btn-prev"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <Button 
                  onClick={nextStep}
                  className="bg-brand-primary hover:bg-blue-700"
                  data-testid="btn-next"
                >
                  Suivant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={submitForm}
                  disabled={isSubmitting}
                  className="bg-brand-secondary hover:bg-orange-600 cta-button"
                  data-testid="btn-submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Estimation;
