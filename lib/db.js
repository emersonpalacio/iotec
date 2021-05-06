'use strict'
// sequelize es un contructor
const Sequelize = require('sequelize')
let sequelize = null
// esportamos la funcion
module.exports = function setupDatabase (config) {
  // singelton
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
