import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Award, 
  ArrowRight,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Transparence',
      description: 'Nous vous expliquons clairement notre processus d\'évaluation et le prix proposé.'
    },
    {
      icon: Users,
      title: 'Service client',
      description: 'Une équipe dédiée et réactive pour répondre à toutes vos questions.'
    },
    {
      icon: Award,
      title: 'Professionnalisme',
      description: 'Des experts automobiles pour une évaluation juste de votre véhicule.'
    },
  ];

  const stats = [
    { value: '500+', label: 'Véhicules rachetés' },
    { value: '24h', label: 'Délai moyen' },
    { value: '4.8/5', label: 'Satisfaction client' },
    { value: '3', label: 'Régions couvertes' },
  ];

  return (
    <div className="min-h-screen" data-testid="about-page">
      {/* Hero */}
      <section className="bg-brand-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            À propos de nous
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            VendezVotreCar, votre partenaire de confiance pour le rachat de véhicules en Belgique
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
                Notre mission
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Chez <strong>VendezVotreCar</strong>, nous croyons que vendre sa voiture ne devrait pas être un parcours du combattant. 
                  Trop souvent, les particuliers se retrouvent confrontés à des démarches complexes, des estimations opaques 
                  ou des acheteurs peu fiables.
                </p>
                <p>
                  Notre mission est simple : <strong>simplifier la vente de votre véhicule</strong>, quel que soit son état. 
                  En panne, accidenté, avec un fort kilométrage ou sans contrôle technique, nous rachetons tous les véhicules 
                  et nous nous occupons de toutes les démarches administratives.
                </p>
                <p>
                  Basés en Belgique, nous intervenons dans toute la <strong>Wallonie</strong>, à <strong>Bruxelles</strong> et 
                  en <strong>Flandre</strong>. Notre équipe d'experts automobiles vous garantit une estimation juste et transparente.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/7144213/pexels-photo-7144213.jpeg" 
                alt="Client satisfait" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-heading text-4xl font-bold text-brand-primary">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
              Nos valeurs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ce qui nous guide au quotidien
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center" data-testid={`value-${index}`}>
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-light rounded-full mb-4">
                    <value.icon className="h-7 w-7 text-brand-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
              Zone d'intervention
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {['Wallonie', 'Bruxelles', 'Flandre'].map((region, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <MapPin className="h-8 w-8 text-brand-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-gray-900">{region}</h3>
                <p className="text-gray-500 text-sm">Enlèvement gratuit</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Faites-nous confiance
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Rejoignez les centaines de clients satisfaits qui nous ont fait confiance pour vendre leur véhicule
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

export default About;
