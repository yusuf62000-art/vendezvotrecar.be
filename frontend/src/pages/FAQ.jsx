import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'Quels types de véhicules rachetez-vous ?',
      answer: 'Nous rachetons tous types de véhicules : voitures, utilitaires, camionnettes. Quel que soit leur état (en panne, accidenté, sans contrôle technique, fort kilométrage), nous faisons une offre. Toutes les marques sont acceptées.'
    },
    {
      question: 'Comment se déroule l\'estimation ?',
      answer: 'L\'estimation se fait en 3 étapes simples : 1) Vous remplissez notre formulaire en ligne avec les informations de votre véhicule. 2) Notre expert vous rappelle sous 2 heures pour discuter et vous faire une offre. 3) Si vous acceptez, nous organisons l\'enlèvement et le paiement.'
    },
    {
      question: 'L\'estimation est-elle gratuite ?',
      answer: 'Oui, l\'estimation est totalement gratuite et sans engagement. Vous êtes libre d\'accepter ou de refuser notre offre.'
    },
    {
      question: 'Combien de temps pour recevoir une offre ?',
      answer: 'Nous vous rappelons sous 2 heures (jours ouvrés, de 9h à 19h) après réception de votre demande pour vous faire une offre personnalisée.'
    },
    {
      question: 'L\'enlèvement est-il payant ?',
      answer: 'Non, l\'enlèvement est entièrement gratuit, que votre véhicule roule ou non. Nous venons le chercher à l\'adresse de votre choix.'
    },
    {
      question: 'Comment suis-je payé ?',
      answer: 'Le paiement se fait par virement bancaire sécurisé le jour même de l\'enlèvement de votre véhicule. Vous recevez votre argent sous 24-48h selon votre banque.'
    },
    {
      question: 'Mon véhicule ne roule plus, pouvez-vous venir le chercher ?',
      answer: 'Absolument ! Nous disposons de dépanneuses pour venir chercher les véhicules qui ne roulent pas. L\'enlèvement reste gratuit.'
    },
    {
      question: 'Quelles sont les démarches administratives ?',
      answer: 'Nous nous occupons de toutes les démarches : certificat de cession, radiation de la carte grise, etc. Vous n\'avez qu\'à nous fournir les documents du véhicule et votre pièce d\'identité.'
    },
    {
      question: 'Dans quelles régions intervenez-vous ?',
      answer: 'Nous intervenons dans toute la Belgique : Wallonie, Bruxelles et Flandre. Où que vous soyez, nous venons chercher votre véhicule.'
    },
    {
      question: 'Que se passe-t-il si je change d\'avis après avoir accepté l\'offre ?',
      answer: 'Vous pouvez annuler à tout moment avant l\'enlèvement effectif du véhicule. Nous comprenons que la vente d\'un véhicule est une décision importante.'
    },
    {
      question: 'Rachetez-vous les véhicules sans contrôle technique ?',
      answer: 'Oui, nous rachetons les véhicules dont le contrôle technique a expiré ou qui ne peuvent pas passer le contrôle. Cela n\'affecte pas notre capacité à faire une offre.'
    },
    {
      question: 'Comment est calculé le prix de rachat ?',
      answer: 'Le prix est calculé en fonction de plusieurs critères : marque, modèle, année, kilométrage, état général, état du marché. Notre expert vous expliquera les éléments pris en compte lors de son appel.'
    },
  ];

  return (
    <div className="min-h-screen" data-testid="faq-page">
      {/* Hero */}
      <section className="bg-brand-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Questions fréquentes
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Trouvez les réponses à vos questions sur le rachat de véhicules
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-gray-900 hover:text-brand-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-gray-600 mb-6">
            Notre équipe est là pour vous aider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-light">
                Nous contacter
              </Button>
            </Link>
            <a href="tel:+32472950237">
              <Button className="bg-brand-primary hover:bg-blue-700 text-white">
                +32 472 95 02 37
              </Button>
            </a>
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
            Estimation gratuite en 2 minutes
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

export default FAQ;
