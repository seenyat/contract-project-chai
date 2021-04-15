const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')



router.get('/profile/:id', async(req, res) => {
  const profile = await User.findById(req.params.id) 


  res.render('cabinet',{user:profile});
});







module.exports = router;
