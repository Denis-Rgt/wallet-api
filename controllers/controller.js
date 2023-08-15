// var mysql = require('mysql'); // Import MySQL module
// var con = require('../database'); // Import MySQL connection
var crypto = require('crypto'); // Import crypto module


const db = require('../models/index');
const Category = db.Category;
const Depense =  db.Depense;
const User = db.User;
const { Op, where } = require("sequelize");

exports.index = function (req, res) {
    res.render('pages/index');
}

exports.addCategory = async function (req, res) {
    ////console.log(req.body);
    let category = Category.build({ nom: req.body.nom })
    await category.save()
    .then(data => {
      // //console.log(data);
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
}

exports.addDepense = async function (req, res) {
  // //console.log(req.body);
    let depense = Depense.build({ nom: req.body.nom, montant: req.body.montant, category_id: req.body.category_id, date : req.body.date, description: req.body.description, user_id: req.body.user_id })
    await depense.save()
    .then(data => {
      // //console.log(data);
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
}

exports.getDepenses = async function (req, res) {
  if (req.query.search == null) {
    Depense.findAll({
      where: {
        user_id: req.user.id
      }
    })
    .then(data => {
      // //console.log("Depenses récupérées !");
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
  } else { 
  Depense.findAll({
    where:{
      [Op.or]: [
        {nom: {[Op.substring]: req.query.search}},
        {description: {[Op.substring]: req.query.search}}
      ]
    }
  })
  .then(data => {
    // //console.log(data);
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
  }
}

exports.getOneDepense = async function (req, res) {
  Depense.findByPk(req.params.depense_id)
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.addUser = async function (req, res) {
  let user = User.build({ nom: req.body.nom, email: req.body.email, password: req.body.password })
  
    await user.save()
    .then(data => {
      // //console.log(data);
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
}

exports.getCategories = async function (req, res) {
  if (req.query.search == null) {
    Category.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
  } else {
  Category.findAll({
    where:{
      [Op.or]: [
        {nom: {[Op.substring]: req.query.search}}
      ]
    }
  })
  .then(data => {
    //console.log(data);
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
  }
}

exports.getOneCategory = async function (req, res) {
  Category.findByPk(req.params.category_id)
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.getUsers = async function (req, res) {
  if (req.query.search == null) {
    User.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
  } else {
    User.findAll({
      where: {
        [Op.or]: [
          {nom: {[Op.substring]: req.query.search}},
          {email: {[Op.substring]: req.query.search}}
        ]
      }
    })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  }) 
  }
}

exports.getOneUser = async function (req, res) {
  User.findByPk(req.params.user_id)
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.updateDepense = async function (req, res) {
  //console.log(req.body, req.params.depense_id);
  Depense.update({ nom: req.body.nom, 
                  montant: req.body.montant, 
                  category_id: req.body.category_id, 
                  date : req.body.date, 
                  description: req.body.description, 
                  user_id: req.body.user_id }, 
                  { where: { depense_id: req.params.depense_id } })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.deleteDepense = async function (req, res) {
  Depense.destroy({ where: { depense_id: req.params.depense_id } })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.updateUser = async function (req, res) {
  User.update({ nom: req.body.nom, 
                  email: req.body.email, 
                  password: req.body.password }, 
                  { where: { user_id: req.params.user_id } })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.deleteUser = async function (req, res) {
  User.destroy({ where: { user_id: req.params.user_id } })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.updateCategory = async function (req, res) {
  Category.update({ nom: req.body.nom }, { where: { category_id: req.params.category_id } })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.deleteCategory = async function (req, res) {
  Category.destroy({ where: { category_id: req.params.category_id } })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}
