const { Router } = require('express')
const livrosRoutes = require('./livros.routers')

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' })
})

routes.use('/livros', livrosRoutes)

module.exports = routes

