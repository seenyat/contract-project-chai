const express = require('express')
const Tea = require('../models/tea')
const router = express.Router()
const Comment = require('../models/comment')
const path = require('path')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(123)
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

const upload = multer({ storage: storage })

router.get('/', async function (req, res) {
  let teas = await Tea.find({})
  // console.log(teas)
  if (req.session.user) {
    return res.render('index', {teaList: teas, username: req.session.user})
  }
  res.render('index', {teaList: teas})
})

router.get('/teastory', async function (req, res) {
  if (req.session.user) {
    return res.render('teastory', {username: req.session.user})
  }
  res.render('teastory')
})

router.get('/tea/:id', async function (req, res) {
  let id = req.params.id
  let teaObj = await Tea.findOne({_id: id})
  console.log(teaObj)
  let comments = await Comment.find({article: id}).populate('author')
  if (req.session.user) {
    // console.log(req.session.user)
    return res.render('tea', {tea: teaObj, username: req.session.user, comments})
  }
  res.render('tea', {tea: teaObj, comments})
})
router.get('/teaname/:id', async function (req, res) {
  let nameTea = req.params.id
  let teaObj = await Tea.findOne({name: nameTea})
  console.log(nameTea, teaObj)
  let comments = await Comment.find({article: teaObj._id}).populate('author')
  
  if (req.session.user) {
    // console.log(req.session.user)
    return res.render('tea', {tea: teaObj, username: req.session.user, comments})
  }
  res.render('tea', {tea: teaObj, comments})
})

router.delete('/tea/:id', async function (req, res) {
  console.log(req.params)
  await Tea.deleteOne({_id:req.params.id}) 
  res.send('delete') 
})

router.post('/tea/add', upload.single('picture'),  async function (req, res) {
  console.log(req.file)
  let {description, location, name} = req.body;
  Tea.create({
    name: name,
    description: description,
    image: req.file.filename,
    location: location,
  })
  console.log(req.body)
})




module.exports = router
