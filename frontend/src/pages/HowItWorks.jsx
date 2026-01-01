import { Link } from 'react-router-dom';
import { 
  FileText, 
  Phone, 
  Car, 
  CreditCard, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Décrivez votre véhicule',
      description: 'Remplissez notre formulaire en ligne en 2 minutes. Indiquez la marque, le modèle, l\'année, le kilométrage et l\'état de votre véhicule.',
      details: [
        'Formulaire simple et rapide',
        'Ajoutez des photos pour une estimation précise',
        'Gratuit et sans engagement'
      ]
    },
    {
      number: '02',
      icon: Phone,
      title: 'Recevez notre appel',
      description: 'Notre expert vous rappelle sous 2 heures pour discuter de votre véhicule et vous faire une offre de rachat.',
      details: [
        'Rappel sous 2 heures (jours ouvrés)',
        'Offre personnalisée',
        'Réponses à toutes vos questions'
      ]
    },
    {
      number: '03',
      icon: Car,
      title: 'Nous récupérons votre véhicule',
      description: 'Si vous acceptez notre offre, nous venons chercher votre véhicule à l\'adresse de votre choix, sans frais.',
      details: [
        'Enlèvement gratuit à domicile',
        'Prise en charge même si le véhicule ne roule pas',
        'Rendez-vous flexible'
      ]
    },
    {
      number: '04',
      icon: CreditCard,
      title: 'Paiement immédiat',
      description: 'Vous recevez votre paiement le jour même de l\'enlèvement. Transaction sécurisée et transparente.',
      details: [
        'Paiement le jour de l\'enlèvement',
        'Virement bancaire sécurisé',
        'Toutes les démarches administratives incluses'
      ]
    }
  ];

  const guarantees = [
    { icon: Clock, title: 'Rapidité', description: 'Réponse sous 2h, enlèvement sous 48h' },
    { icon: Shield, title: 'Sécurité', description: 'Paiement garanti et sécurisé' },
    { icon: CheckCircle2, title: 'Simplicité', description: 'Zéro paperasse, on s\'occupe de tout' },
  ];

  return (
    <div className="min-h-screen" data-testid="how-it-works-page">
      {/* Hero */}
      <section className="bg-brand-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Comment ça marche ?
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Vendez votre voiture en 4 étapes simples, quel que soit son état
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                data-testid={`process-step-${index}`}
              >
                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-5xl font-bold text-brand-primary/20">{step.number}</span>
                    <div className="bg-brand-light rounded-full p-3">
                      <step.icon className="h-6 w-6 text-brand-primary" />
                    </div>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <Card className="bg-gray-50 border-0">
                    <CardContent className="p-8 flex items-center justify-center min-h-[250px]">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-primary rounded-2xl mb-4">
                          <step.icon className="h-12 w-12 text-white" />
                        </div>
                        <p className="font-heading text-xl font-semibold text-gray-900">Étape {step.number}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
              Nos garanties
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-light rounded-full mb-4">
                    <guarantee.icon className="h-7 w-7 text-brand-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-2">{guarantee.title}</h3>
                  <p className="text-gray-600 text-sm">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Prêt à vendre votre véhicule ?
          </h2>
          <p className="text-blue-100 mb-8">
            Obtenez une estimation gratuite en 2 minutes
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

export default HowItWorks;
