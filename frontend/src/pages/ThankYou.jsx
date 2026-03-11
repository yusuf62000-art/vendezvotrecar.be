import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Phone, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const ThankYou = () => {
  const location = useLocation();
  const estimation = location.state?.estimation;

  // Google Ads Conversion Tracking
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17847289291/DIVgCKvjgNsbEMuLoL5C',
        'value': 1.0,
        'currency': 'EUR'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 lg:py-20" data-testid="thankyou-page">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Demande envoyée avec succès !
          </h1>
          <p className="text-lg text-gray-600">
            Merci pour votre demande de rachat. Notre équipe va l'étudier et vous recontacter très rapidement.
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 text-left">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-brand-light rounded-full p-3">
                <Clock className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-gray-900 mb-1">
                  Nous vous rappelons sous 2 heures
                </h3>
                <p className="text-gray-600 text-sm">
                  Du lundi au samedi, de 9h à 19h. Si vous nous contactez en dehors de ces horaires, nous vous rappellerons dès l'ouverture.
                </p>
              </div>
            </div>

            {estimation && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Récapitulatif</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-500">Véhicule :</span>
                  <span className="font-medium">{estimation.marque} {estimation.modele}</span>
                  <span className="text-gray-500">Année :</span>
                  <span className="font-medium">{estimation.annee}</span>
                  <span className="text-gray-500">Référence :</span>
                  <span className="font-medium text-brand-primary">{estimation.id?.slice(0, 8).toUpperCase()}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="bg-brand-primary text-white rounded-xl p-6 mb-8">
          <h3 className="font-heading font-semibold text-lg mb-2">
            Une question urgente ?
          </h3>
          <p className="text-blue-100 mb-4">
            N'hésitez pas à nous appeler directement
          </p>
          <a href="tel:+32472950237">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-brand-primary hover:bg-gray-100"
              data-testid="call-button"
            >
              <Phone className="mr-2 h-5 w-5" />
              +32 472 95 02 37
            </Button>
          </a>
        </div>

        {/* Back to home */}
        <Link to="/">
          <Button variant="outline" data-testid="back-home-button">
            Retour à l'accueil
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
