module.exports = function (app){
  console.log(process.env)
  const path = require('path')
  const express = require('express')
  const FileStore = require('session-file-store')(session)
  app.set('view engine', 'hbs')

  app.set('views', path.join(__dirname, '../views'));
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
}