const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')




router.get('/registration', (req, res) => {
  res.render('registration');
});

router.post('/registration', async (req, res) => {
  let {username, email, password} = req.body
  console.log(username, email, password)

  let checkUser = await User.find({email: email})
  if(checkUser.length > 0){
    res.json({
      status: 'failed, e-mail is already used'
    })
    return
  }
  let user = await User.create({
    username,email,password: bcrypt.hashSync(password)
  })
  req.session.user = user
  console.log(user)
   res.render('success',{username: req.session.user.username},(err,html)=>{res.json({status:html})});
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
        let user = req.session.user.username
      return res.render('success', { username: user})
    } 
  } 
  res.render("login", {status: 'Неверные данные'});
});

router.get('/logout',async(req,res)=>{
  if (req.session.user) {
    try {
      // уничтожение сессии (удаление файла)
      await req.session.destroy();
      // чистим куку (удаление в браузере)
      // res.clearCookie("user_sid");
      // перенаправляемся на корень
      res.redirect("/");
    } catch (error) {
      // улетаем в обработчик ошибок (middleware/error-handlers)
      next(error);
    }
  } else {
    res.redirect("/login");
  }
})



  module.exports = router;
