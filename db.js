// require('dotenv').config(); 

// const Sequelize = require('sequelize')
// const sequelize = new Sequelize(
//     'notes', 
//     process.env.DB_USER,
//     process.env.DB_PASSWORD, {
//     dialect: 'mysql',
//     host: 'localhost'
//    }
// );
// module.exports = sequelize

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
'orm_depense',
'root',
'test', {
dialect: 'mysql',
host: 'localhost'
}
);
module.exports = sequelize