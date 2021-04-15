const express = require('express')
const Tea = require('../models/tea')
const router = express.Router()
const Comment = require('../models/comment')
const path = require('path')

var multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage })

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
  
})

router.post('/tea/add', upload.single('picture'),  async function (req, res) {
  console.log(req.file)
  console.log(req.body)
})




module.exports = router