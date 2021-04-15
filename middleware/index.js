
module.exports = function (app){
  // console.log(process.env)
  const session = require('express-session')
  const morgan = require('morgan')
  const path = require('path')
  const express = require('express')
  const hbs = require('hbs')
  const dbConnect = require('./db-connect')
  const FileStore = require('session-file-store')(session)
  const { cookiesCleaner } = require("./auth");
  const cookieParser = require('cookie-parser')

  hbs.registerPartials(__dirname + '/../views')
  hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
  console.log(__dirname + '/../views')
  app.set('view engine', 'hbs')
  app.use(morgan('dev'))
  app.use(cookieParser())
  app.use(session({
    store: new FileStore(), // тип хранилища FileStore, который создает нам папку с файлами
    key: "user_sid", // ключ - название куки
    secret: "anything_here", // слово, используемое для шифрования
    resave: false, //  настройка пересохранения куки, при каждом запросе
    saveUninitialized: false, // настройка создания сессии, даже без авторизации
    cookie: {
      expires: 600000, // время жизни куки
      httpOnly: false, // по умолчанию true
    },
  }))
  app.use(cookiesCleaner);

  app.set('views', path.join(__dirname, '../views'));
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
}
