const mongoose = require('mongoose')
const Tea = require('../models/tea')
const Article = require('../models/article')
const User = require('../models/user')
const Comment = require('../models/comment')
const faker = require('faker')
const { fake } = require('faker')

mongoose.connect('mongodb://127.0.0.1:27017/TeaStory', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, () => {
  console.log('connected to db')
})


// Teas
async function seed(){
let teas = [];
for (let i = 0; i < 20; i++) {
  let tea = await Tea.create({
    name: faker.name.title(),
    price: faker.datatype.number(2000),
    description: faker.lorem.words(50),
    location: faker.lorem.words(1),
    locationCoords: faker.datatype.number(2000)
  })
  teas.push(tea)
  
}
console.log(teas);

USERS
console.log(users)
}

seed()
