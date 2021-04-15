const express = require('express')
const Tea = require('../models/tea')
const router = express.Router()

router.post('/comments/add', async function (req, res) {
  console.log(req.body)
})