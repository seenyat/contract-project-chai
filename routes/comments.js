const express = require('express')
const Tea = require('../models/tea')
const router = express.Router()
const Comment = require('../models/comment')

router.post('/add', async function (req, res) {
  let user = req.session.user;
  let commentObj = await Comment.create({
    content: req.body.content,
    author: user._id,
    article: req.body.id,
  })
  

  res.redirect('back');
})

router.post('/comments/delete/:id', async function (req, res) {
  let user = req.session.user;
  let commentObj = await Comment.create({
    content: req.body.content,
    author: user._id,
    article: req.body.id,
  })
})



module.exports = router;