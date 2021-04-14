module.exports = function (app){
  console.log(process.env)
  const path = require('path')
  const express = require('express')
  const hbs = require('hbs')
  // const FileStore = require('session-file-store')(session)
 
 
  hbs.registerPartials(__dirname + '/../views')
  app.set('view engine', 'hbs')

  app.set('views', path.join(__dirname, '../views'));
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
}
