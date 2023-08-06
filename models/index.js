const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Category = require('./category');
db.Depense = require('./depense');
db.User = require('./user');

db.Depense.belongsTo( db.Category, {foreignKey: "category_id"} );
db.Category.hasMany(db.Depense, { foreignKey: "category_id" });

db.Depense.belongsTo( db.User, {foreignKey: "user_id"} );
db.User.hasMany(db.Depense, { foreignKey: "user_id" });

module.exports = db