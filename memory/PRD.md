# VendezVotreCar - PRD (Product Requirements Document)

## Énoncé du problème
Site web de rachat de véhicules aux particuliers en Belgique (Wallonie, Bruxelles, Flandre). Le site accepte tous les véhicules quel que soit leur état : en panne, accidenté, moteur HS, sans contrôle technique, fort kilométrage.

## Architecture
- **Backend**: FastAPI + MongoDB
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Base de données**: MongoDB (collections: estimations, contacts)
- **Notifications**: Gmail SMTP (emails automatiques au propriétaire)

## Personas utilisateurs
1. **Vendeur particulier**: Souhaite vendre sa voiture rapidement, même si elle est en mauvais état
2. **Administrateur**: Consulte les demandes reçues via email + lien vers page détail

## Fonctionnalités implémentées ✅
- [x] Page d'accueil avec hero, badges de confiance, témoignages, étapes
- [x] Formulaire d'estimation multi-étapes (4 étapes)
  - Étape 1: Infos véhicule (marque, modèle, année, km, état, carburant, boîte, immatriculation, **prix souhaité**, **délai de vente**)
  - Étape 2: Upload photos (optionnel, **max 5 photos**, compression automatique)
  - Étape 3: Coordonnées vendeur + consentement RGPD
  - Étape 4: Récapitulatif + confirmation
- [x] **Champ "Prix souhaité" (optionnel)** - Ajouté le 7 Février 2026
- [x] **Champ "Délai de vente" (optionnel)** - Options: Immédiatement, Sous 1 semaine, Sous 2 semaines, Sous 1 mois, Pas pressé
- [x] **Tableau de bord Admin** - Ajouté le 7 Février 2026
  - Accès sécurisé (lien secret + mot de passe)
  - Liste des demandes avec filtres (statut, ville, recherche)
  - Visualisation des photos en grand
  - Changement de statut (Nouveau → Contacté → Traité → Refusé)
  - Suppression des demandes
  - Boutons d'action (Appeler, Email)
- [x] **Multi-langue (FR/NL/EN)** - Ajouté le 7 Février 2026
  - Français par défaut
  - Sélecteur dans le header (Français | Nederlands | English)
  - Toutes les pages traduites
  - Préférence sauvegardée dans localStorage
- [x] Page de remerciement post-soumission
- [x] Page "Comment ça marche" (4 étapes)
- [x] Page "Véhicules rachetés" (6 types)
- [x] FAQ avec accordéon (12 questions)
- [x] Page À propos
- [x] Page Contact avec formulaire
- [x] Mentions légales
- [x] Politique de confidentialité
- [x] Politique des cookies + bannière RGPD
- [x] API Backend pour estimations et contacts
- [x] Stockage en MongoDB
- [x] **Notifications email automatiques** via Gmail SMTP
  - **Photos en pièces jointes** directement dans l'email
  - Informations complètes du véhicule et du vendeur
- [x] **Page de visualisation des demandes** (`/demande/{id}`) avec photos
- [x] **Google Ads tracking** (tag global + conversion sur page merci)

## Coordonnées configurées
- **Nom**: VendezVotreCar
- **Téléphone**: +32 472 95 02 37
- **Email**: vendezvotrecar@gmail.com
- **Zone**: Wallonie, Bruxelles, Flandre (Belgique)
- **Site production**: https://vendezvotrecar.be

## Backlog P0 (Done)
✅ MVP complet livré
✅ Champ "Prix souhaité" ajouté
✅ Champ "Délai de vente" ajouté
✅ Tableau de bord admin
✅ Multi-langue (FR/NL/EN)

## Backlog P1 (Futur)
- [ ] Intégration reCAPTCHA
- [ ] Export des demandes (CSV/Excel)

## Backlog P2 (Nice to have)
- [ ] Estimation automatique basée sur l'Argus
- [ ] Chat en direct

## Accès Admin
- **URL secrète** : `/admin/vvc-secret-2026`
- **Mot de passe** : `VVC2026Admin!`

## Notes de déploiement
⚠️ **IMPORTANT pour la production (`vendezvotrecar.be`)**:
- S'assurer que `REACT_APP_BACKEND_URL` pointe vers le bon backend de production
- Vérifier que `SITE_URL` dans le backend contient `https://vendezvotrecar.be`

## Date de création
1er Janvier 2026

## Dernière mise à jour
7 Février 2026 - Ajout du multi-langue (FR/NL/EN)
