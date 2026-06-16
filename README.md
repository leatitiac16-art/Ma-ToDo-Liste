
<img width="2880" height="1586" alt="Capture d&#39;écran 2026-06-16 162519" src="https://github.com/user-attachments/assets/209dd82c-55b0-486e-b7b5-c73f07ea53ce" />

# Ma-ToDo-Liste

> 🇫🇷 Français | 🇬🇧 English below

## 🇫🇷 Version Française

Une application de gestion de tâches complète avec timer Pomodoro, mode focus, et filtres par énergie.

Fonctionnalités:

Todo list — Ajouter, modifier, supprimer et compléter des tâches
Tâches fractionnées — Diviser une tâche complexe en sous-tâches
Timer Pomodoro — Travailler en sessions de 25 minutes avec pauses
Filtres par énergie — Filtrer les tâches selon ton niveau d'énergie du moment
Mode focus — Se concentrer sur une seule tâche à la fois
Connexion utilisateur — Créer un compte et accéder à ses tâches depuis n'importe où
Base de données — Tâches sauvegardées en PostgreSQL

Technologies utilisées:

Front-end: — HTML5, CSS3, JavaScript Vanilla  
Back-end: — Node.js, Express.js  
Base de données: — PostgreSQL  
Outils: — ESLint, Prettier, Git & GitHub


Fonctionnalités

To-do list — Ajouter, modifier, compléter et supprimer des tâches.
Tâches fractionnées — Diviser une tâche complexe en sous-tâches.
Projets — Regrouper des tâches par projet, avec leurs propres sous-tâches.
Calendrier — Visualiser les tâches par mois ou par semaine.
Timer Pomodoro — Travailler en sessions concentrées avec pauses.
Mode focus — Se concentrer sur une seule tâche à la fois.
Filtres par énergie — Filtrer les tâches selon son niveau d'énergie du moment.
Connexion utilisateur — Créer un compte et accéder à ses tâches (mots de passe hachés avec bcrypt).


Installation et lancement

Prérequis : Node.js et une base de données PostgreSQL.

# 1. Cloner le dépôt
git clone https://github.com/leatitiac16-art/Ma-ToDo-Liste.git
cd Ma-ToDo-Liste

# 2. Installer les dépendances
npm install

# 3. Créer un fichier .env à la racine avec l'URL de la base
#    DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/matodo"

# 4. Préparer la base de données
npx prisma migrate dev

# 5. Lancer le serveur (back-end)
npm start


Démo en ligne
*Lien à venir*

---

## 🇬🇧 English Version

A complete task management app with Pomodoro timer, focus mode, and energy-based filters.

Features:

Todo list — Add, edit, delete and complete tasks
Split tasks — Break down complex tasks into subtasks
Pomodoro Timer — Work in 25-minute sessions with breaks
Energy filters — Filter tasks by energy level
Focus mode — Concentrate on one task at a time
User auth — Create an account and access tasks anywhere
Database — Tasks saved in PostgreSQL

Tech Stack:

Front-end — HTML5, CSS3, Vanilla JS  
Back-end — Node.js, Express.js  
Database — PostgreSQL  
Tools — ESLint, Prettier, Git & GitHub


Features

To-do list — Add, edit, complete and delete tasks.
Subtasks — Break a complex task into smaller steps.
Projects — Group tasks by project, each with its own subtasks.
Calendar — View tasks by month or week.
Pomodoro timer — Work in focused sessions with breaks.
Focus mode — Concentrate on one task at a time.
Energy filters — Filter tasks based on your current energy level.
User authentication — Create an account and access your tasks (passwords hashed with bcrypt).


Installation & Setup

Requirements: Node.js and a PostgreSQL database.

# 1. Clone the repository
git clone https://github.com/leatitiac16-art/Ma-ToDo-Liste.git
cd Ma-ToDo-Liste

# 2. Install dependencies
npm install

# 3. Create a .env file at the root with your database URL
#    DATABASE_URL="postgresql://user:password@localhost:5432/matodo"

# 4. Set up the database
npx prisma migrate dev

# 5. Start the server (back-end)
npm start


### 🔗 Live Demo
*Coming soon*



**Leatitia** — [@leatitiac16-art](https://github.com/leatitiac16-art)

*Projet de diplôme — Junior Web Developer*
