# STD-List

Application de gestion de tâches moderne développée avec **React**, **Node.js**, **Express** et **MongoDB**.

---

# Aperçu

STD-List est une application Full Stack permettant :

- Création de compte utilisateur
- Connexion sécurisée avec JWT
- Gestion de tâches quotidiennes
- Calendrier des tâches
- Modification du compte utilisateur
- Modification de l'adresse email
- Modification du mot de passe
- Suppression du compte
- Déploiement Frontend / Backend
- Intégration continue avec GitHub Actions

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
- Authentification JWT
- Sauvegarde de la session dans le LocalStorage

## Gestion des tâches

- Ajouter une tâche
- Modifier une tâche
- Supprimer une tâche
- Consultation des tâches du jour
- Consultation des tâches via un calendrier

## Gestion du compte

- Modifier son email
- Modifier son mot de passe
- Supprimer son compte

## Interface utilisateur

- Sidebar dynamique
- Menu déroulant utilisateur
- Fenêtres modales
- Responsive Design

---

# Architecture du projet

## Frontend

```txt
front/
│
├── src/
│   ├── components/
│   │   ├── SideBar.jsx
│   │   ├── Today.jsx
│   │   ├── Calendrier.jsx
│   │   ├── GestionCompte.jsx
│   │   └── Home.jsx
│   │
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
```

## Backend

```txt
Back/
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── auth.js
│   ├── tasks.js
│   └── account.js
│
└── server.js
```

---

# Installation

## Cloner le projet

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

## Lancement

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

Créer un fichier **.env**

```env
MONGO_URI=votre_uri_mongodb
JWT_SECRET=votre_secret
PORT=3000
```

## Lancement

```bash
node server.js
```

---

# API REST

## Authentification

### Inscription

```http
POST /auth/register
```

### Connexion

```http
POST /auth/login
```

---

## Gestion des tâches

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

## Gestion du compte

### Modifier son email

```http
PUT /account/email
```

### Modifier son mot de passe

```http
PUT /account/password
```

### Supprimer son compte

```http
DELETE /account/delete
```

---

# Tests automatisés

Le projet utilise **Cypress** afin d'automatiser les tests End-to-End des principales fonctionnalités de l'application.

## Tests réalisés

### Authentification

- Inscription d'un utilisateur
- Connexion d'un utilisateur

### Gestion des tâches

- Ajout d'une tâche
- Suppression d'une tâche

Les tests permettent de simuler le comportement réel d'un utilisateur directement dans le navigateur.

## Exécution des tests

### Mode graphique

```bash
npx cypress open
```

### Mode terminal

```bash
npx cypress run
```

---

# Docker

Le backend est conteneurisé avec **Docker** afin de garantir un environnement identique entre le développement et la production.

## Construction de l'image

```bash
docker build -t std-list-back .
```

## Lancement du conteneur

```bash
docker run -p 3000:3000 std-list-back
```

---

# CI/CD

Le projet met en place une démarche **DevOps** grâce à **GitHub Actions**.

À chaque **Push** ou **Pull Request** sur la branche principale, un workflow est automatiquement exécuté.

## Étapes du pipeline

- Récupération du dépôt GitHub
- Installation de Node.js
- Installation des dépendances
- Build du Frontend
- Lancement automatique du serveur Vite
- Exécution des tests Cypress
- Vérification du bon déroulement du pipeline

Le workflow est disponible dans :

```txt
.github/workflows/test.yml
```

---

# Déploiement

L'application est entièrement déployée.

## Frontend

- Vercel

## Backend

- Render

## Base de données

- MongoDB Atlas

Les variables d'environnement sont configurées directement sur les plateformes de déploiement afin de sécuriser les informations sensibles.

---

# Sécurité

Le projet met en œuvre plusieurs mécanismes de sécurité :

- Authentification JWT
- Hachage des mots de passe avec bcrypt
- Variables d'environnement (.env)
- Fichier `.env.example`
- Vérification des identifiants avant modification du compte
- Vérification du mot de passe avant suppression du compte
- API REST sécurisée

---

# Auteur

**Jean-Emmanuel Gallo**

Développeur Full Stack JavaScript

## Technologies

- React
- Node.js
- Express
- MongoDB
- Docker
- Cypress
- GitHub Actions
- Vercel
- Render
