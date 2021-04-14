const express = require('express')
const Tea = require('../models/tea')
const router = express.Router()

router.get('/', async function (req, res) {
  let teas = await Tea.find({})
  // console.log(teas)
  if (req.session.user) {
    return res.render('index', {teaList: teas, username: req.session.user.username})
  }
  res.render('index', {teaList: teas})
})

module.exports = router