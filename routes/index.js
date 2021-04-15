const express = require('express')
const Tea = require('../models/tea')
const router = express.Router()
const Comment = require('../models/comment')

router.get('/', async function (req, res) {
  let teas = await Tea.find({})
  // console.log(teas)
  if (req.session.user) {
    return res.render('index', {teaList: teas, username: req.session.user})
  }
  res.render('index', {teaList: teas})
})

router.get('/tea/:id', async function (req, res) {
  let id = req.params.id
  let teaObj = await Tea.findOne({_id: id})
  // console.log(teaObj)
  let comments = await Comment.find({article: id}).populate('author')
  if (req.session.user) {
    // console.log(req.session.user)
    return res.render('tea', {tea: teaObj, username: req.session.user, comments})
  }
  res.render('tea', {tea: teaObj, comments})
})

router.delete('/tea/:id', async function (req, res) {
  let id = req.params.id
  let teaObj = await Tea.findOne({_id: id})
  // console.log(teaObj)
  let comments = await Comment.find({article: id}).populate('author')
  if (req.session.user) {
    // console.log(req.session.user)
    return res.render('tea', {tea: teaObj, username: req.session.user, comments})
  }
  res.render('tea', {tea: teaObj, comments})
})

module.exports = router