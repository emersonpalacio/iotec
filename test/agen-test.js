'use strict'

const test = import('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const config = {
  logging: function () {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}

let AgentStub = null
let db = null
let sanbox = null

test.beforeEach(async () => {
  sanbox = sinon.createSandbox()
  AgentStub = {
    hasMany:sanbox.spy()
  }

  const setupDatabase = proxyquire('../',{
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub()
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sanbox && sanbox.restore()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service sholud axist')
})

test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was excuted')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument sholud be the model')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument needs to be the model')
  t.true(MetricStub.belongsTo.called, 'MetricModels.belongTo was excuted')
})
