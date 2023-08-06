const Sequelize = require('sequelize')
const db = require('../db.js')
//reconstruct the model for sequelize
const Depense =  db.define('depense', {
        depense_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom: { type: Sequelize.STRING, allowNull: false},
        date: { type: Sequelize.DATE, allowNull: false},
        montant: { type: Sequelize.FLOAT, allowNull: false},
        description: { type: Sequelize.STRING, allowNull: false},
        user_id: { type: Sequelize.INTEGER, allowNull: false},
        category_id: { type: Sequelize.INTEGER, allowNull: false}
})

module.exports = Depense;