/** 
*  Customer controller
*  Handles requests related to customers (see routes)
*
* @author Varun Goud Pulipalpula <s534848@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const Model = require('../models/account.js')
const notfoundstring = 'account not found'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.account.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  const data = req.app.locals.account.query
  const item = find(data, { userId: id })
  LOG.info(`inside data ${item}`)
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('account/details.ejs',
    {
      title: 'Account Details',
      layout: 'layout.ejs',
      account: item
    })
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  res.render('account/index.ejs')
})

module.exports = api
