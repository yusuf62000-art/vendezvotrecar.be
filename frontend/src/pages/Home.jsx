import { Link } from 'react-router-dom';
import { 
  Car, 
  Zap, 
  Truck, 
  FileCheck, 
  Shield, 
  Clock, 
  CreditCard,
  ArrowRight,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  const trustBadges = [
    { icon: Zap, title: t('home.trustBadge1'), description: t('home.trustBadge1') },
    { icon: Truck, title: t('home.trustBadge2'), description: t('home.trustBadge2') },
    { icon: FileCheck, title: t('home.trustBadge3'), description: t('home.trustBadge3') },
    { icon: Shield, title: t('home.trustBadge4'), description: t('home.trustBadge4') },
  ];

  const vehicleTypes = [
    t('home.type1'),
    t('home.type2'),
    t('home.type3'),
    t('home.type4'),
    t('home.type5'),
    t('home.type6'),
  ];

  const testimonials = [
    {
      name: 'Pierre D.',
      location: 'Bruxelles',
      rating: 5,
      text: t('home.testimonial1'),
      date: t('home.testimonial1Author')
    },
    {
      name: 'Marie L.',
      location: 'Liège',
      rating: 5,
      text: t('home.testimonial2'),
      date: t('home.testimonial2Author')
    },
    {
      name: 'Thomas B.',
      location: 'Namur',
      rating: 5,
      text: t('home.testimonial3'),
      date: t('home.testimonial3Author')
    },
  ];

  const steps = [
    { number: '01', title: t('home.how1Title'), description: t('home.how1Desc') },
    { number: '02', title: t('home.how2Title'), description: t('home.how2Desc') },
    { number: '03', title: t('home.how3Title'), description: t('home.how3Desc') },
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-primary to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/11589801/pexels-photo-11589801.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>{t('home.trustBadge1')}</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {t('home.heroTitle')}<br />
                <span className="text-brand-secondary">{t('home.heroTitleHighlight')}</span>
              </h1>
              <p className="text-lg text-blue-100 max-w-lg">
                {t('home.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/estimation">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-brand-secondary hover:bg-orange-600 text-white text-lg px-8 py-6 cta-button"
                    data-testid="hero-cta"
                  >
                    {t('home.heroCta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:+32451025849">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-primary text-lg px-8 py-6"
                    data-testid="hero-phone"
                  >
                    +32 451 02 58 49
                  </Button>
                </a>
              </div>
              {/* Quick stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-blue-200 text-sm">{t('about.stat1')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24h</p>
                  <p className="text-blue-200 text-sm">{t('home.why3Title')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.8/5</p>
                  <p className="text-blue-200 text-sm">{t('about.stat2')}</p>
                </div>
              </div>
            </div>

            {/* Right: Quick form preview */}
            <div className="hidden lg:block">
              <Card className="bg-white/95 backdrop-blur shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-4">
                    {t('estimation.title')}
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Car className="h-6 w-6 mx-auto text-brand-primary mb-1" />
                        <span className="text-sm text-gray-600">{t('home.sectionTypesTitle')}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Clock className="h-6 w-6 mx-auto text-brand-primary mb-1" />
                        <span className="text-sm text-gray-600">2 min</span>
                      </div>
                    </div>
                    <Link to="/estimation" className="block">
                      <Button className="w-full bg-brand-primary hover:bg-blue-700 text-white py-6" data-testid="quick-form-cta">
                        {t('home.heroCta')}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <p className="text-xs text-gray-500 text-center">
                      {t('home.trustBadge4')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types Marquee */}
      <section className="bg-gray-900 py-4 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...vehicleTypes, ...vehicleTypes].map((type, index) => (
              <span key={index} className="inline-flex items-center mx-8 text-gray-400 font-heading text-lg">
                <span className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></span>
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div 
                key={index} 
                className="trust-badge bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                data-testid={`trust-badge-${index}`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-light rounded-full mb-4">
                  <badge.icon className="h-7 w-7 text-brand-primary" />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 mb-1">{badge.title}</h3>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.sectionHowTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.sectionHowSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative" data-testid={`step-${index}`}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <span className="font-heading text-5xl font-bold text-brand-primary/20">{step.number}</span>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mt-4 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/comment-ca-marche">
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-light">
                {t('home.heroSecondary')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.sectionTestimonialsTitle')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card hover:shadow-lg transition-shadow" data-testid={`testimonial-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                    <span className="text-xs text-gray-400">{testimonial.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('home.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/estimation">
              <Button 
                size="lg" 
                className="bg-brand-secondary hover:bg-orange-600 text-white text-lg px-8 py-6 cta-button"
                data-testid="bottom-cta"
              >
                {t('home.ctaButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
