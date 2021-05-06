'use strict'

const debug = require('debug')('iote:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./') // la requerimos del index.js

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'this will destroy your  database, are you sure'
  })
  if (!answer.setup) {
    return console.log('Nothin happened :)')
  }
  // el dialect es el tipo de base datos que voy a conectar
  // setup para poder preguntar
  const config = {
    database: process.env.DB_Name || 'iotedb',
    username: process.env.DB_USER || 'iot',
    password: process.env.DB_PASS || 'A1b2c3d4e5f6',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Succes')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[Fatal herror]')}${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
