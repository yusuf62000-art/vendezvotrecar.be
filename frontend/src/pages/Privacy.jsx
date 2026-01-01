const Privacy = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="privacy-page">
      {/* Hero */}
      <section className="bg-brand-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Politique de confidentialité
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-gray">
          <p><em>Dernière mise à jour : {new Date().toLocaleDateString('fr-BE')}</em></p>

          <h2>1. Collecte des données personnelles</h2>
          <p>
            Dans le cadre de notre activité de rachat de véhicules, nous collectons les données 
            personnelles suivantes :
          </p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Code postal et ville</li>
            <li>Informations relatives au véhicule (marque, modèle, année, kilométrage, état)</li>
            <li>Photos du véhicule (si fournies)</li>
          </ul>

          <h2>2. Finalité du traitement</h2>
          <p>
            Les données collectées sont utilisées exclusivement pour :
          </p>
          <ul>
            <li>Traiter votre demande de rachat de véhicule</li>
            <li>Vous contacter pour vous faire une offre</li>
            <li>Organiser l'enlèvement du véhicule si vous acceptez notre offre</li>
            <li>Répondre à vos questions via le formulaire de contact</li>
          </ul>

          <h2>3. Base légale du traitement</h2>
          <p>
            Le traitement de vos données personnelles est basé sur votre consentement explicite, 
            que vous donnez en cochant la case RGPD lors de la soumission du formulaire d'estimation.
          </p>

          <h2>4. Durée de conservation</h2>
          <p>
            Vos données personnelles sont conservées pendant une durée de 3 ans à compter de votre 
            dernière interaction avec nos services, sauf obligation légale de conservation plus longue.
          </p>

          <h2>5. Destinataires des données</h2>
          <p>
            Vos données ne sont jamais vendues à des tiers. Elles peuvent être communiquées à :
          </p>
          <ul>
            <li>Notre équipe interne pour le traitement de votre demande</li>
            <li>Nos prestataires techniques (hébergement, maintenance)</li>
          </ul>

          <h2>6. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul>
            <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : vendezvotrecar@gmail.com
          </p>

          <h2>7. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
            protéger vos données personnelles contre tout accès non autorisé, modification, 
            divulgation ou destruction.
          </p>

          <h2>8. Contact</h2>
          <p>
            Pour toute question relative à cette politique de confidentialité, vous pouvez nous 
            contacter à : vendezvotrecar@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
