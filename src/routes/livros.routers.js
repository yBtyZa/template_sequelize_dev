const { Router } = require('express')
const LivrosController = require('../controllers/livros.controller')

const livrosRoutes = Router()

livrosRoutes.post('/', LivrosController.criar)
livrosRoutes.get('/', LivrosController.listarTodos)
livrosRoutes.get('/:id', LivrosController.listarUm)
livrosRoutes.delete('/:id', LivrosController.deletar)
livrosRoutes.put('/:id', LivrosController.atualizar)

module.exports = livrosRoutes