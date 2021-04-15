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

router.get('/tea/:id', async function (req, res) {
  let id = req.params.id
  let teaObj = await Tea.findOne({_id: id})
  console.log(teaObj)
  if (req.session.user) {
    return res.render('tea', {tea: teaObj, username: req.session.user.username})
  }
  res.render('tea', {tea: teaObj})
})

module.exports = router