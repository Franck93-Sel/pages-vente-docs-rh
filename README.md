# MyRH — Plateforme de documents RH

Plateforme fictive de vente de documents RH (contrats, avenants, fiches de paie, etc.).

---

## Lancer le projet

```bash
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`

---

## Comptes de test

### Compte Administrateur

| Champ    | Valeur            |
|----------|-------------------|
| Email    | `admin@myrh.fr`   |
| Mot de passe | `Admin2024!`  |
| Rôle     | Admin             |
| Nom      | Sophie Martin     |
| Société  | MyRH              |

**Accès admin :** Dashboard → bouton "Administration" → gestion CRUD des documents.

---

### Compte Utilisateur Demo

| Champ    | Valeur            |
|----------|-------------------|
| Email    | `demo@myrh.fr`    |
| Mot de passe | `Demo2024!`   |
| Rôle     | Utilisateur       |
| Nom      | Jean Dupont       |
| Société  | Dupont SARL       |

**Ce compte a des commandes et téléchargements fictifs** visibles dans le dashboard.

---

## Fonctionnalités disponibles

| Page          | Description                                              |
|---------------|----------------------------------------------------------|
| Landing       | Page d'accueil avec capture d'email                      |
| Boutique      | Catalogue de 5 packs et 14 documents payants             |
| Téléchargement| Document gratuit CDI après inscription                   |
| Connexion     | Login / inscription (mode démo)                          |
| Dashboard     | Vue d'ensemble, commandes, téléchargements               |
| Admin         | CRUD documents (réservé au compte admin)                 |

---

## Données fictives

- **15 documents** (1 gratuit + 14 payants) dans les catégories : contrat, avenant, réglementation, fiche, formation
- **5 packs** avec réductions allant de 44% à 50%
- **3 commandes fictives** pour le compte démo
- **3 téléchargements fictifs** pour le compte démo

> Les modifications faites en admin (ajout, édition, suppression) sont **en mémoire** uniquement — elles se réinitialisent au rechargement de la page.

---

## Stack technique

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React (icônes)
- Authentification mock (localStorage)
