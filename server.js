const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('./node_modules/@prisma/client/default.js')
const bcrypt = require('bcrypt')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Ma-ToDo-Liste fonctionne !' })
})

// GET - Récupérer toutes les tâches
app.get('/taches', async (req, res) => {
  try {
    const taches = await prisma.tache.findMany({
      include: { sousTaches: true }
    })
    res.json(taches)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// POST - Créer une tâche
app.post('/taches', async (req, res) => {
  try {
    const { titre, description, priorite, energie, humeur, date } = req.body
    const tache = await prisma.tache.create({
      data: { titre, description, priorite, energie, humeur, date }
    })
    res.status(201).json(tache)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// PUT - Modifier une tâche
app.put('/taches/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { titre, description, terminee, priorite, energie, humeur, date } = req.body
    const tache = await prisma.tache.update({
      where: { id },
      data: { titre, description, terminee, priorite, energie, humeur, date }
    })
    res.json(tache)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// DELETE - Supprimer une tâche
app.delete('/taches/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await prisma.tache.delete({ where: { id } })
    res.json({ message: 'Tâche supprimée !' })
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// POST - Créer une sous-tâche
app.post('/taches/:id/sous-taches', async (req, res) => {
  try {
    const tacheId = parseInt(req.params.id)
    const { titre } = req.body
    const sousTache = await prisma.sousTache.create({
      data: { titre, tacheId }
    })
    res.status(201).json(sousTache)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// POST - Créer une sous-tâche de projet
app.post('/taches-projet/:id/sous-taches', async (req, res) => {
  try {
    const tacheProjetId = parseInt(req.params.id)
    const { titre } = req.body
    const sousTache = await prisma.sousTacheProjet.create({
      data: { titre, tacheProjetId }
    })
    res.status(201).json(sousTache)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})
 
//  GET - Récupérer tous les projets
app.get('/projets', async (req, res) => {
  try {
    const projets = await prisma.projet.findMany({
      include: { taches: true }
    })
    res.json(projets)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// GET - Récupérer un projet par id
app.get('/projets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const projet = await prisma.projet.findUnique({
      where: { id },
      include: { taches: true }
    })
    if (!projet) return res.status(404).json({ erreur: 'Projet non trouvé' })
    res.json(projet)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// PUT - Mettre à jour un projet
app.put('/projets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { progression } = req.body
    const projet = await prisma.projet.update({
      where: { id },
      data: { progression }
    })
    res.json(projet)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

//  POST - Créer un projet
app.post('/projets', async (req, res) => {
  try {
    const { nom, description, couleur, dateDebut, dateFin, taches } = req.body
    const projet = await prisma.projet.create({
      data: {
        nom,
        description,
        couleur,
        dateDebut,
        dateFin,
        taches: {
          create: taches || []
        }
      },
      include: { taches: true }
    })
    res.status(201).json(projet)
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

//  DELETE - Supprimer un projet
app.delete('/projets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await prisma.projet.delete({ where: { id } })
    res.json({ message: 'Projet supprimé !' })
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// POST - Inscription
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    // Vérifie si l'email existe déjà 
    const existant = await prisma.user.findUnique({ where: { email } })
    if (existant) {
      return res.status(400).json({ erreur: 'Cet email est déjà utilisé' })
    }

    // Hashe le mot de passe
    const hash = await bcrypt.hash(password, 10)

    // Crée l'utilisateur
    const user = await prisma.user.create({
      data: { email, password: hash }
    })

    res.status(201).json({ message: 'Compte créé !', userId: user.id })
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

// POST - Connexion
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Cherche l'utilisateur
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ erreur: 'Email ou mot de passe incorrect' })
    }

    // Compare le mot de passe avec le hash
    const valide = await bcrypt.compare(password, user.password)
    if (!valide) {
      return res.status(400).json({ erreur: 'Email ou mot de passe incorrect' })
    }

    res.json({ message: 'Connecté !', userId: user.id, email: user.email })
  } catch (error) {
    res.status(500).json({ erreur: error.message })
  }
})

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000')
})