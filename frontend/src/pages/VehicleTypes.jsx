import { Link } from 'react-router-dom';
import { 
  Car, 
  AlertTriangle, 
  Wrench, 
  FileX, 
  Gauge, 
  Truck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const VehicleTypes = () => {
  const vehicleTypes = [
    {
      icon: Car,
      title: 'Véhicule d\'occasion',
      description: 'Votre voiture roule mais vous souhaitez la vendre rapidement ? Nous la rachetons à un prix juste.',
      conditions: ['Toutes marques', 'Tous kilométrages', 'Avec ou sans CT']
    },
    {
      icon: Wrench,
      title: 'Voiture en panne',
      description: 'Moteur qui ne démarre plus, problème électrique, panne mécanique... Peu importe la panne, on rachète.',
      conditions: ['Panne moteur', 'Panne électrique', 'Problème de boîte']
    },
    {
      icon: AlertTriangle,
      title: 'Véhicule accidenté',
      description: 'Accident de la route, carrosserie endommagée, châssis touché... Nous rachetons tous les véhicules accidentés.',
      conditions: ['Dégâts carrosserie', 'Sinistre total', 'Châssis endommagé']
    },
    {
      icon: FileX,
      title: 'Sans contrôle technique',
      description: 'Votre CT a expiré ou votre véhicule ne peut plus passer le contrôle ? Aucun problème pour nous.',
      conditions: ['CT expiré', 'Refus au CT', 'Véhicule non roulant']
    },
    {
      icon: Gauge,
      title: 'Fort kilométrage',
      description: '200 000, 300 000 km ou plus ? Le kilométrage n\'est pas un obstacle, nous rachetons tous les véhicules.',
      conditions: ['+ 200 000 km', '+ 300 000 km', 'Kilométrage illimité']
    },
    {
      icon: Truck,
      title: 'Utilitaires',
      description: 'Camionnettes, fourgons, véhicules utilitaires... Professionnels ou particuliers, on rachète aussi les utilitaires.',
      conditions: ['Camionnettes', 'Fourgons', 'Véhicules pro']
    },
  ];

  return (
    <div className="min-h-screen" data-testid="vehicle-types-page">
      {/* Hero */}
      <section className="bg-brand-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Véhicules rachetés
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Nous rachetons tous les véhicules, quel que soit leur état ou leur kilométrage
          </p>
        </div>
      </section>

      {/* Vehicle Types Grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleTypes.map((type, index) => (
              <Card key={index} className="card-hover" data-testid={`vehicle-type-${index}`}>
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-light rounded-xl mb-4">
                    <type.icon className="h-7 w-7 text-brand-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {type.description}
                  </p>
                  <ul className="space-y-2">
                    {type.conditions.map((condition, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
                Pourquoi nous faire confiance ?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Estimation transparente</h4>
                    <p className="text-gray-600">Nous vous expliquons clairement comment nous évaluons votre véhicule.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Pas de frais cachés</h4>
                    <p className="text-gray-600">L'enlèvement est gratuit, même si votre véhicule ne roule plus.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Démarches simplifiées</h4>
                    <p className="text-gray-600">Nous nous occupons de toutes les formalités administratives.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <img 
                src="https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg" 
                alt="Service de dépannage" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <p className="text-gray-600 text-center">
                Nous intervenons dans toute la Belgique : Wallonie, Bruxelles et Flandre
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Votre véhicule correspond ?
          </h2>
          <p className="text-blue-100 mb-8">
            Obtenez une estimation gratuite en quelques clics
          </p>
          <Link to="/estimation">
            <Button 
              size="lg" 
              className="bg-brand-secondary hover:bg-orange-600 text-white cta-button"
              data-testid="cta-button"
            >
              Estimer ma voiture
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default VehicleTypes;
