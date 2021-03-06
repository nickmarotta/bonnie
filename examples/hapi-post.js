'use strict'

const hapi = require('hapi')

const server = new hapi.Server()

// Tell our app to listen on port 3000
server.connection({ port: 3000 })

// Create the POST route to /sms
server.route({
  method: 'POST',
  path: '/hero',
  handler: function (request, reply) {
    const body = request.payload.Body
    const response = reply(`You sent: ${body} to Hapi`)
    response.header('Content-Type', 'text/plain')
  }
})

server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 3000')
})