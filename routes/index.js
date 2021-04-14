const express = require('express')
const Tea = require('../models/tea')
const router = express.Router()

router.get('/', async function (req, res) {
  let teas = await Tea.find({})
  console.log(teas)
  res.render('index', {teaList: teas})
})

module.exports = router