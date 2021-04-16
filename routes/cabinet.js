const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs');
const Tea = require('../models/tea');
const Comment=require('../models/comment')


router.get('/profile/:id', async(req, res) => {
  const profile =  await User.findById(req.params.id) 
  const comments = await Comment.find({author:profile._id}).populate('author')
   console.log(comments);
  res.render('cabinet',{user:profile,username:profile,comments});
});

router.get('/admin/:id', async(req, res) => {
  const profile = await User.findById(req.params.id) 
  const posts = await Tea.find({}) 


  res.render('controlpanel',{user:profile,username:profile, posts});
});


router.put('/profile/:id', async (req, res) => {
 console.log(req.body);
 let x = await User.findOneAndUpdate(
    { _id: req.params.id },
    {$set: { username: req.body.username,
              email: req.body.email,
              role:req.body.role,
              } } )

res.json(x)
})

router.delete('/comments/delete/:id',async(req,res)=>{
  await  Comment.deleteOne({_id:req.params.id}) 
  res.send('delete') 
})



module.exports = router;
