const express = require('express')
const bodyParser = require('body-parser')
const discord = require('./poorDiplomacy')

// Create a new instance of express
const app = express()

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route that receives a POST request to /example-post
app.post('/example-post', function (req, res) {
  const body = req.body
  console.log(body);
  res.set('Content-Type', 'text/plain')
  res.send(`t `)
})

// Route that receives a GET request to /hero
app.get('/hero', function (req, res) {
  discord.playINeedAHero(); 
  res.set('Content-Type', 'text/plain')
  res.send(`I've got 5 jabronis, comin' right up.`)
})

// HealthCheck
app.get('/ping', function (req, res) {
  res.set('Content-Type', 'text/plain')
  res.send(`pong`)
})

// Tell our app to listen on port 1800
app.listen(1800, function (err) {
  if (err) {
    throw err
  }
  discord.initializeClient();
  console.log('Server started on port 1800')
})