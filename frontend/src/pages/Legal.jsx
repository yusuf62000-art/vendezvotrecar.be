const Legal = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="legal-page">
      {/* Hero */}
      <section className="bg-brand-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Mentions légales
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-gray">
          <h2>1. Informations légales</h2>
          <p>
            <strong>Nom du site :</strong> VendezVotreCar<br />
            <strong>Email :</strong> vendezvotrecar@gmail.com<br />
            <strong>Téléphone :</strong> +32 451 02 58 49<br />
            <strong>Zone d'activité :</strong> Belgique (Wallonie, Bruxelles, Flandre)
          </p>

          <h2>2. Activité</h2>
          <p>
            VendezVotreCar est un service de rachat de véhicules aux particuliers. 
            Nous rachetons tous types de véhicules, quel que soit leur état : 
            en panne, accidenté, sans contrôle technique, fort kilométrage, etc.
          </p>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété 
            exclusive de VendezVotreCar ou de ses partenaires. Toute reproduction, représentation, 
            modification, publication, adaptation de tout ou partie des éléments du site est interdite 
            sans autorisation écrite préalable.
          </p>

          <h2>4. Limitation de responsabilité</h2>
          <p>
            VendezVotreCar s'efforce de fournir des informations exactes et à jour sur ce site. 
            Toutefois, nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité des 
            informations mises à disposition.
          </p>

          <h2>5. Droit applicable</h2>
          <p>
            Le présent site et les mentions légales qui y figurent sont régis par le droit belge. 
            En cas de litige, les tribunaux belges seront seuls compétents.
          </p>

          <h2>6. Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter 
            à l'adresse email suivante : vendezvotrecar@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default Legal;
