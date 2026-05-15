# STD-List

Application de gestion de tâches moderne développée avec React, Node.js, Express et MongoDB.

## Aperçu

STD-List est une application fullstack permettant :

- Création de compte utilisateur
- Connexion sécurisée avec JWT
- Gestion de tâches quotidiennes
- Calendrier des tâches
- Modification du compte utilisateur
- Modification email et mot de passe
- Suppression du compte
- Déploiement frontend/backend
- CI/CD automatisé avec GitHub + Render + Vercel

---

# Stack technique

## Frontend

- React
- React Router DOM
- CSS
- Vite

## Backend

- Node.js
- Express
- JWT
- bcrypt
- MongoDB
- Mongoose

## Déploiement

### Frontend

- Vercel

### Backend

- Render

### Base de données

- MongoDB Atlas

---

# Fonctionnalités

## Authentification

- Inscription utilisateur
- Connexion utilisateur
- JWT Token
- Stockage utilisateur connecté dans localStorage

## Gestion des tâches

- Ajouter une tâche
- Modifier une tâche
- Supprimer une tâche
- Affichage des tâches du jour
- Affichage calendrier

## Gestion du compte

- Modifier son email
- Modifier son mot de passe
- Supprimer son compte

## Interface utilisateur

- Sidebar dynamique
- Dropdown utilisateur
- Modals interactifs
- Overlay dynamique
- Responsive design

---

# Architecture du projet

## Frontend

```txt
front/
 ├── src/
 │    ├── components/
 │    │    ├── SideBar.jsx
 │    │    ├── Today.jsx
 │    │    ├── Calendrier.jsx
 │    │    ├── GestionCompte.jsx
 │    │    ├── Home.jsx
 │    │
 │    ├── assets/
 │    ├── App.jsx
 │    ├── main.jsx
```

## Backend

```txt
Back/
 ├── models/
 │    ├── User.js
 │    ├── Task.js
 │
 ├── routes/
 │    ├── auth.js
 │    ├── tasks.js
 │    ├── account.js
 │
 ├── server.js
```

---

# Installation

## 1. Cloner le projet

```bash
git clone https://github.com/j-eGallo/std-list
```

---

# Frontend

## Installation

```bash
cd front
npm install
```

## Lancer le frontend

```bash
npm run dev
```

---

# Backend

## Installation

```bash
cd Back
npm install
```

## Variables d'environnement

Créer un fichier `.env`

```env
MONGO_URI=votre_uri_mongodb
JWT_SECRET=votre_secret
PORT=3000
```

## Lancer le backend

```bash
node server.js
```

---

# API Routes

## Auth

### Inscription

```http
POST /auth/register
```

### Connexion

```http
POST /auth/login
```

---

## Tasks

### Récupérer les tâches

```http
GET /api/tasks/:date
```

### Ajouter une tâche

```http
POST /api/tasks
```

### Modifier une tâche

```http
PUT /api/tasks/:id
```

### Supprimer une tâche

```http
DELETE /api/tasks/:id
```

---

## Compte utilisateur

### Modifier email

```http
PUT /account/email
```

### Modifier mot de passe

```http
PUT /account/password
```

### Supprimer compte

```http
DELETE /account/delete
```

---

# Docker

## Dockerfile backend

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

---

# CI/CD

Le projet utilise un système CI/CD automatisé.

## Workflow

```txt
GitHub → Render/Vercel → Déploiement automatique
```

Chaque push Git déclenche automatiquement :

- Build frontend
- Déploiement frontend
- Build backend
- Déploiement backend

---

# Déploiement

## Frontend

Déployé sur Vercel.

## Backend

Déployé sur Render.

## Base de données

MongoDB Atlas.

---

# Sécurité

- Hash des mots de passe avec bcrypt
- Authentification JWT
- Vérification utilisateur
- Vérification mot de passe avant suppression
- Vérification mot de passe avant modification email

---

# Auteur

Jean-Emmanuel Gallo

Développeur Fullstack
