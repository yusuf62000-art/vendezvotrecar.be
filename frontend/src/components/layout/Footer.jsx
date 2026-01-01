import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-brand-primary rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">
                Vendez<span className="text-brand-primary">VotreCar</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Rachat de véhicules en Belgique. Tous états acceptés : en panne, accidenté, sans contrôle technique.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/estimation" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Estimer ma voiture
                </Link>
              </li>
              <li>
                <Link to="/comment-ca-marche" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/vehicules-rachetes" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Véhicules rachetés
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+32451025849" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                  <Phone className="h-4 w-4" />
                  +32 451 02 58 49
                </a>
              </li>
              <li>
                <a href="mailto:vendezvotrecar@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                  <Mail className="h-4 w-4" />
                  vendezvotrecar@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4" />
                  Wallonie, Bruxelles, Flandre
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} VendezVotreCar. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Zone de service : Belgique</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
