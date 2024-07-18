const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const Livros = connection.define('livros', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    qtd_paginas:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'categorias', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    autor_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'autores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }, 
},
{
    paranoid : true
})

module.exports = Livros