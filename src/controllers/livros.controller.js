const Livros = require('../models/Livros')

class LivrosController {

    async criar(req, res) {
        try {
            const dados = req.body
            if (!dados.nome || !dados.qtd_paginas || !dados.categoria_id || !dados.autor_id) {
                return res.status(400).json({ message: 'Todos os campos devem ser preenchidos!' })
            }
            const novoLivro = await Livros.create(dados)
            return res.status(201).json({
                id: novoLivro.id,
                nome: novoLivro.nome,
                qtd_paginas: novoLivro.qtd_paginas,
                categoria_id: novoLivro.categoria_id,
                autor_id: novoLivro.autor_id
            })
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um livro com esse nome!' })
            }
            return res.status(500).json({ message: 'Não foi possível criar o livro' })
        }
    }

    async listarTodos(req, res) {
        try {
            const livros = await Livros.findAll({
                attributes: [['id', 'livro_id'], 'nome', 'qtd_paginas'],
                order: [['id', 'DESC']]
            })
            if (livros.length === 0) {
                return res.status(404).json({ message: 'Nenhum livro encontrado' })
            }
            return res.status(200).json(livros)
        } catch {
            return res.status(500).json({ message: 'Erro ao buscar os livros' })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const livro = await Livros.findByPk(id)
            if (!livro) {
                return res.status(404).json({ message: 'Livro não encontrado' })
            }
            return res.status(200).json(livro)
        } catch {
            return res.status(500).json({ message: 'Erro ao buscar o livro' })
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params
            const livro = await Livros.findByPk(id)
            if (!livro) {
                return res.status(404).json({ message: 'Livro não encontrado' })
            }
            await Livros.destroy({ where: { id } })
            return res.status(200).json({ message: `Livro com id ${id} excluído com sucesso!` })

        } catch {
            return res.status(500).json({ message: 'Erro ao excluir o livro' })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;

            const livro = await Livros.findByPk(id);

            if (!livro) {
                return res.status(404).json({ message: 'Livro não encontrado' });
            }

            dados.nome ? livro.nome = dados.nome : null
            dados.qtd_paginas ? livro.qtd_paginas = dados.qtd_paginas : null
            dados.categoria_id ? livro.categoria_id = dados.categoria_id : null
            dados.autor_id ? livro.autor_id = dados.autor_id : null
            await livro.save()

            return res.status(200).json(livro)
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Ja existe um livro com esse nome!' })
            }
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ message: 'O autor ou categoria informados não existe!' })
            }
            return res.status(500).json({ message: 'Erro ao atualizar o livro' })
        }
    }
}

module.exports = new LivrosController();