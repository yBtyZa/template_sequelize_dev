const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const connection = require('./database/connection')
const APP_PORT = process.env.APP_PORT

class Server {
    constructor(server = express()) {
        this.middleware(server),
        this.database(),
        server.use(routes)
        this.initializeServer(server)
    }

    async middleware(server) {
        console.log('Executando middleware...')
        server.use(cors())
        server.use(express.json())
        console.log('Middleware executado com sucesso!')
    }

    async database() {
        try {
            console.log('Conectando ao banco de dados...')
            await connection.authenticate()
            console.log('Conectado ao banco de dados com sucesso!')
        } catch {
            console.log('Erro ao conectar ao banco de dados!')
        }
    }

    async initializeServer(server) {
        server.listen(APP_PORT, () => {
            console.log(`Servidor iniciado na porta ${APP_PORT}`)
        })
    }
}

module.exports = { Server }