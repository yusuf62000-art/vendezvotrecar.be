# VendezVotreCar - PRD (Product Requirements Document)

## Énoncé du problème
Site web de rachat de véhicules aux particuliers en Belgique (Wallonie, Bruxelles, Flandre). Le site accepte tous les véhicules quel que soit leur état : en panne, accidenté, moteur HS, sans contrôle technique, fort kilométrage.

## Architecture
- **Backend**: FastAPI + MongoDB
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Base de données**: MongoDB (collections: estimations, contacts)

## Personas utilisateurs
1. **Vendeur particulier**: Souhaite vendre sa voiture rapidement, même si elle est en mauvais état
2. **Administrateur**: Consulte les demandes reçues

## Fonctionnalités implémentées ✅
- [x] Page d'accueil avec hero, badges de confiance, témoignages, étapes
- [x] Formulaire d'estimation multi-étapes (4 étapes)
  - Étape 1: Infos véhicule (marque, modèle, année, km, état, carburant, boîte)
  - Étape 2: Upload photos (optionnel, max 10)
  - Étape 3: Coordonnées vendeur + consentement RGPD
  - Étape 4: Récapitulatif + confirmation
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

## Coordonnées configurées
- **Nom**: VendezVotreCar
- **Téléphone**: 04 79 37 66 64
- **Email**: Ymardi@gmail.com
- **Zone**: Wallonie, Bruxelles, Flandre (Belgique)

## Backlog P0 (Done)
✅ MVP complet livré

## Backlog P1 (Futur)
- [ ] Tableau de bord admin pour gérer les demandes
- [ ] Notifications email automatiques
- [ ] Intégration Google Analytics
- [ ] Intégration reCAPTCHA

## Backlog P2 (Nice to have)
- [ ] Estimation automatique basée sur l'Argus
- [ ] Chat en direct
- [ ] Multi-langue (FR/NL)

## Date de création
1er Janvier 2026

## Dernière mise à jour
MVP livré le 1er Janvier 2026
