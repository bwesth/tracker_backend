// import React from 'react'
// import ReactDOM from 'react-dom'
// import './index.css'
// import App from './App'
// import * as serviceWorker from './serviceWorker'
// import express from 'express'

// npm install pg
// npm install express


// HOW TO RUN!!!
// Open terminal => cd to ./src => run; node index.js


var pg = require('pg');



const staticQuery = {
  time: 'SELECT NOW() AS "result"',
}

function getUser (email) {
  const query = "SELECT * FROM users WHERE email = '"+email+"'"
  console.log("Query = "+query)
  return query
}

function validateUser (email) {
  let returned = ''
  var conString = "postgres://qkmmfvxz:YvJJxSK6Q-f2tOR9ErdoBj8CsxREtxAl@rogue.db.elephantsql.com:5432/qkmmfvxz" //Can be found in the Details page
  var client = new pg.Client(conString)
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(getUser(email), function(err, result) {
      if(err) {
        return console.error('error running query', err)
      }

      // console.log(result.rows[0])
      returned = result.rows[0]
      console.log("returned ="+returned)
      client.end()

    })
  })
  return returned
}



const express = require('express')
const app = express()
const port = 3001



app.get('/', (req, res) => {
  console.log("Yirp")
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.send('Test')
})

app.get('/login', (req, res) => {
  console.log("Someone tried to log in")
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  console.log("Query= "+req.query.toString())
  console.log("Search= "+req.search)
  // console.log("req.query = "+req.query)
  // console.log("Search ="+req.search)
  //search: "?email=mette%40climate.dk&password=hestepige"

  // console.log("email = "+req.query.email)

  const data = validateUser("mette@climate.dk")
  console.log("data = "+data.toString())
 
  // (req.query.password === password) ? res.send({name: name}) : res.send({name: "No no no!"})
  res.send({name: "Test",data: req})
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})