const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')





router.get('/register', (req, res) => {
  res.render('registration');
});

router.post('/register', async (req, res) => {
  let {username, email, password, role} = req.body
  // console.log(username, email, password, role)


  let checkUser = await User.find({email: email})
  if(checkUser.length > 0){
    res.render('index', (err, html) => {res.send(html)})
    res.send('Ошибка, такая почта уже есть в базе')
    return
  }
  if (role == "Администратор"){
    let {master} = req.body; 
    if(master.toLowerCase() != 'черного'){
      res.send('Вам еще рано в админы :(')
      return 
    }
  }
  let user = await User.create({
    username,email,password: bcrypt.hashSync(password), role
  })
  req.session.user = user
  // console.log(user)
   res.send('100');
});


router.get('/login',(req,res)=>{
  res.render('login', {status: 'Введите логин и пароль'})
})


router.post('/login', async (req, res) => {
  let { email, password} = req.body
  let checkUser = await User.findOne({email: email})
  if(checkUser){
    if (bcrypt.compareSync(password,checkUser.password)){
      req.session.user = checkUser  
      // let user = req.session.user
      if(checkUser.role == 'Администратор'){
        req.session.user.admin = '123123';
        console.log(req.session.user.admin + 'дыун')
      }
      // console.log(user)
      return res.redirect(301, '/')
    } 
  } 
  res.render("login", {status: 'Неверные данные'});
});

router.get('/logout',async(req,res)=>{
  if (req.session.user) {
    try {
      await req.session.destroy();
     res.clearCookie("user_sid");
     res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
})



  module.exports = router;
