import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { X, Cookie } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="cookies-page">
      {/* Hero */}
      <section className="bg-brand-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Politique des cookies
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-gray">
          <p><em>Dernière mise à jour : {new Date().toLocaleDateString('fr-BE')}</em></p>

          <h2>1. Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, 
            smartphone) lors de la visite d'un site web. Il permet au site de mémoriser des 
            informations sur votre visite.
          </p>

          <h2>2. Cookies utilisés sur ce site</h2>
          
          <h3>Cookies strictement nécessaires</h3>
          <p>
            Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés :
          </p>
          <ul>
            <li>Cookies de session pour le fonctionnement du formulaire</li>
            <li>Cookies de préférences de consentement</li>
          </ul>

          <h3>Cookies analytiques (optionnels)</h3>
          <p>
            Si vous y consentez, nous utilisons des cookies pour mesurer l'audience de notre site :
          </p>
          <ul>
            <li>Google Analytics : mesure du trafic et du comportement des visiteurs</li>
          </ul>

          <h2>3. Gestion des cookies</h2>
          <p>
            Vous pouvez à tout moment modifier vos préférences en matière de cookies :
          </p>
          <ul>
            <li>Via la bannière de consentement affichée lors de votre première visite</li>
            <li>Via les paramètres de votre navigateur</li>
          </ul>

          <h3>Comment désactiver les cookies dans votre navigateur</h3>
          <p>
            Chaque navigateur propose des options différentes pour gérer les cookies :
          </p>
          <ul>
            <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
            <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
            <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
            <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
          </ul>

          <h2>4. Durée de conservation</h2>
          <p>
            Les cookies sont conservés pour une durée maximale de 13 mois conformément aux 
            recommandations de la CNIL et du RGPD.
          </p>

          <h2>5. Contact</h2>
          <p>
            Pour toute question relative à notre utilisation des cookies, contactez-nous à : 
            vendezvotrecar@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
};

// Cookie Banner Component
export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const refuseCookies = () => {
    localStorage.setItem('cookieConsent', 'refused');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4" data-testid="cookie-banner">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Cookie className="h-6 w-6 text-brand-primary flex-shrink-0" />
          <p className="text-sm text-gray-600">
            Nous utilisons des cookies pour améliorer votre expérience. 
            <a href="/cookies" className="text-brand-primary hover:underline ml-1">
              En savoir plus
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refuseCookies} data-testid="refuse-cookies">
            Refuser
          </Button>
          <Button size="sm" className="bg-brand-primary hover:bg-blue-700" onClick={acceptCookies} data-testid="accept-cookies">
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
