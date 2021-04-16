const mongoose = require('mongoose')
const Tea = require('../models/tea')
const User = require('../models/user')
const Comment = require('../models/comment')
const faker = require('faker')
const { fake } = require('faker')
const fs = require('fs')
const tea = require('../models/tea')
const axios = require('axios')

mongoose.connect('mongodb://127.0.0.1:27017/TeaStory', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, () => {
  console.log('connected to db')
})


// Teas
// console.log(fs.readdirSync('../'))
let teas = fs.readFileSync('data/teas.txt', 'utf-8').split('\n')

teas = teas.map(el =>{
  el = el.split(';')
  obj = {}
  obj.image = el[0].trim() +'.jpeg'
  obj.name = el[1].trim()
  obj.description = el[2].trim()
  obj.location = el[3].trim()
  return obj
})

let link1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
let link2 = '?access_token=pk.eyJ1Ijoic2VlbnlhdCIsImEiOiJja25odW9sY3YzaXBmMnBwOWx4MXA5eWwyIn0.TL1Zyx2TDLUmkT-WShQiyQ'

let massivGovna = []
teas.forEach(async el => {
  
  // console.log(el.location)
  
  link = link1 + encodeURI(el.location)+'.json' + link2
  
  // console.log(link);
  let coordsObj = await axios.get(link);
  
  try {
    console.log(coordsObj.data.features[0].geometry.coordinates)
    el.locationCoords = coordsObj.data.features[0].geometry.coordinates
  } catch (error) {
    
  }
  Tea.create({
      name: el.name,
      description: el.description.slice(0, 100) + '...',
      image: el.image,
      location: el.location,
      locationCoords: el.locationCoords
    })



  let featureObj = {
    'type': 'Feature',
    'properties': {
        'description':
            `<a href="/tea/${el.name}" class="title">${el.name}</a>` + `<img src="/images/${el.image}"></img>` + el.description,
        'icon': 'kitten',
        'marker-size': 'small'
    },
    'geometry': {
        'type': 'Point',
        'coordinates': el.locationCoords
     }
  }
  console.log(featureObj)
  if(featureObj.geometry.coordinates){

    fs.writeFileSync('map123.json', JSON.stringify(featureObj, null, 2)+ ',\n', {flag: 'a'})
  }

})
// console.log(massivGovna);
// fs.writeFileSync('map123.js', massivGovna.join())
// seed()
