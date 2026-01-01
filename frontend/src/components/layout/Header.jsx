import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Car } from 'lucide-react';
import { Button } from '../ui/button';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Comment ça marche', href: '/comment-ca-marche' },
    { name: 'Véhicules rachetés', href: '/vehicules-rachetes' },
    { name: 'FAQ', href: '/faq' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="bg-brand-primary rounded-lg p-2">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">
              Vendez<span className="text-brand-primary">VotreCar</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                  isActive(item.href) ? 'text-brand-primary' : 'text-gray-600'
                }`}
                data-testid={`nav-${item.href.replace('/', '') || 'home'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA & Phone */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              href="tel:0479376664"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors"
              data-testid="phone-link"
            >
              <Phone className="h-4 w-4" />
              04 79 37 66 64
            </a>
            <Link to="/estimation">
              <Button 
                className="bg-brand-secondary hover:bg-orange-600 text-white cta-button"
                data-testid="header-cta"
              >
                Estimer ma voiture
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-brand-primary hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
            <div className="py-4 space-y-2 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-brand-light text-brand-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-nav-${item.href.replace('/', '') || 'home'}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <a
                href="tel:0479376664"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-600"
              >
                <Phone className="h-5 w-5" />
                04 79 37 66 64
              </a>
              <div className="px-3 pt-2">
                <Link to="/estimation" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    className="w-full bg-brand-secondary hover:bg-orange-600 text-white"
                    data-testid="mobile-cta"
                  >
                    Estimer ma voiture
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
