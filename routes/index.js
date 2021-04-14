const express = require('express')
const router = express.Router()


router.get('/', function (req, res) {
  res.send('Chai zaebis')
})


module.exports = router