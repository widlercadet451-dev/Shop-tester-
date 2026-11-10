# DexShop — Achetez Plus, Payez Moins !

Starter marketplace React + Express, avec interface responsive en français et prix affichés en HTG.

## Contenu
- Frontend React/Vite : catalogue de démonstration, recherche, catégories, tri, panier et formulaire de commande.
- Backend Express : endpoint santé, endpoint produits de départ et création de commande.
- PostgreSQL : table de commandes (`backend/schema.sql`).
- `render.yaml` : configuration de déploiement Render.

## Lancer en local
Prérequis : Node.js 20+ et npm.

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
npm run dev
```

Frontend : http://localhost:5173  
API : http://localhost:10000/api/health

Pour que le frontend en développement appelle l'API Express, configurez un proxy Vite ou utilisez le déploiement combiné sur Render. Le site déployé sert le build React depuis Express.

## Déployer sur GitHub et Render
1. Créez un dépôt GitHub nommé `dexshop`.
2. Envoyez tout le contenu de ce dossier dans le dépôt.
3. Dans Render, choisissez **New + → Blueprint**.
4. Connectez GitHub et sélectionnez le dépôt `dexshop`.
5. Vérifiez les ressources proposées par `render.yaml`, puis lancez le déploiement.
6. Une fois le service prêt, ouvrez son URL `onrender.com`.

## Important avant une vraie ouverture commerciale
Ce projet est un MVP de départ, pas encore un marketplace prêt à encaisser des paiements. Les produits sont des données de démonstration, les images produits sont des illustrations emoji et l'endpoint produits n'est pas encore relié à une table d'inventaire. Il faudra notamment construire l'administration, l'authentification sécurisée, la gestion des vendeurs, le stock, les frais de livraison, les remboursements et intégrer un prestataire de paiement réellement disponible dans les pays ciblés. Ne stockez jamais de données de carte bancaire dans cette application.
