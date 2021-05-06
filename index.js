'use strict'
const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')
const defaults = require('defaults')

module.exports = async function (config) {
  // instanciamos al base datos
  config = defaults(config, {
    dialect: 'sqllite',
    poo: {
      max: 10,
      min: 0,
      idle: 1000
    },
    query: {
      raw: true
    }
  })
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModels = setupMetricModel(config)

  // definimos las relacion, agenet tiene muchas  metrias, metrica pertence a un agente
  AgentModel.hasMany(MetricModels) // agente tiene muchas metricas
  MetricModels.belongsTo(AgentModel) // metrica pernece a un agente

  // utilizamos las promesas tipo asink a await
  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.async({ force: true })
  }
  // comfiguracion de la base de datos
  // sequelize.syn();

  // servicios de agente y de metrica
  const Agent = {}
  const Metrica = {}

  return {
    Agent,
    Metrica
  }
}
