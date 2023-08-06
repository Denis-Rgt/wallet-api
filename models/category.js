const Sequelize = require('sequelize')
const db = require('../db.js')


//reconstruct the model for sequelize
const Category =  db.define('category', {
        category_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom: { type: Sequelize.STRING, allowNull: false}
})


module.exports = Category;