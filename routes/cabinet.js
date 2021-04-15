const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')



router.get('/profile/:id', async(req, res) => {
  const profile = await User.findById(req.params.id) 


  res.render('cabinet',{user:profile,username:profile});
});


router.put('/profile/:id', async (req, res) => {
 console.log(req.body);
 let x = await User.findOneAndUpdate(
    { _id: req.params.id },
    {$set: { username: req.body.username,
              email: req.body.email,
              role:req.boby.role  } } )

res.json(x)
})




module.exports = router;
