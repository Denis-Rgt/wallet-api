// class User {
//     constructor (id, nom, email, password) {
//         this.id = id;
//         this.nom = nom;
//         this.email = email;
//         this.password = password;
//     }
// }
//reconstruct the model for sequelize

const Sequelize = require('sequelize')
const db = require('../db.js')

const User =  db.define('user', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom: { type: Sequelize.STRING, allowNull: false},
        email: { type: Sequelize.STRING, allowNull: false},
        password: { type: Sequelize.STRING, allowNull: false}
})

module.exports = User;