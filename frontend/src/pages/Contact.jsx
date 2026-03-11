import { useState } from 'react';
import axios from 'axios';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = 'Requis';
    if (!formData.email) newErrors.email = 'Requis';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.message) newErrors.message = 'Requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setIsSubmitted(true);
      toast.success('Message envoyé avec succès !');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+32 472 95 02 37',
      href: 'tel:+32472950237'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'vendezvotrecar@gmail.com',
      href: 'mailto:vendezvotrecar@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Zone d\'intervention',
      value: 'Wallonie, Bruxelles, Flandre',
      href: null
    },
  ];

  return (
    <div className="min-h-screen" data-testid="contact-page">
      {/* Hero */}
      <section className="bg-brand-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Une question ? Notre équipe est là pour vous aider
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Nos coordonnées
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-brand-light rounded-full p-3">
                        <info.icon className="h-5 w-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{info.title}</p>
                        {info.href ? (
                          <a 
                            href={info.href} 
                            className="font-medium text-gray-900 hover:text-brand-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-gray-900">{info.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-heading font-semibold text-gray-900 mb-2">
                  Horaires
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Lundi - Vendredi : 9h - 19h</p>
                  <p>Samedi : 9h - 17h</p>
                  <p>Dimanche : Fermé</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">
                        Message envoyé !
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ nom: '', email: '', telephone: '', message: '' });
                        }}
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                        Envoyez-nous un message
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nom">Nom *</Label>
                            <Input
                              id="nom"
                              data-testid="contact-input-nom"
                              value={formData.nom}
                              onChange={(e) => updateFormData('nom', e.target.value)}
                              placeholder="Votre nom"
                              className={errors.nom ? 'border-red-500' : ''}
                            />
                            {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              data-testid="contact-input-email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateFormData('email', e.target.value)}
                              placeholder="votre@email.com"
                              className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="telephone">Téléphone (optionnel)</Label>
                          <Input
                            id="telephone"
                            data-testid="contact-input-telephone"
                            type="tel"
                            value={formData.telephone}
                            onChange={(e) => updateFormData('telephone', e.target.value)}
                            placeholder="04XX XX XX XX"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            data-testid="contact-input-message"
                            value={formData.message}
                            onChange={(e) => updateFormData('message', e.target.value)}
                            placeholder="Comment pouvons-nous vous aider ?"
                            rows={5}
                            className={errors.message ? 'border-red-500' : ''}
                          />
                          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        </div>
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-brand-primary hover:bg-blue-700"
                          data-testid="contact-submit"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Envoyer le message
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
