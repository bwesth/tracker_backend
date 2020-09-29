// import React from 'react'
// import ReactDOM from 'react-dom'
// import './index.css'
// import App from './App'
// import * as serviceWorker from './serviceWorker'
// import express from 'express'

// npm install pg
// npm install express
// npm install crypto <--- ??? built in module?
// npm install express-session


// HOW TO RUN!!!
// Open terminal => cd to ./src => run; node index.js


const pg = require('pg')
// const crypto = require('crypto')
// const keys = crypto.generateKeyPair()
// console.log(keys)


function validateUser (email) {
  // console.log(email)
  let data = {}
  var conString = "postgres://qkmmfvxz:YvJJxSK6Q-f2tOR9ErdoBj8CsxREtxAl@rogue.db.elephantsql.com:5432/qkmmfvxz" //Can be found in the Details page
  var client = new pg.Client(conString)
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err)
    }
      client.query('select * from users where email = $1::text', [email], function(err, result) {
      if(err) {
        return console.error('error running query', err)
      }

      data = result.rows[0]
      // console.log(data)
      client.end()
    })
  })
  console.log(data)
  return data
}






const express = require('express')
const app = express()
const port = 3001

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

app.get('/', (req, res) => {
  console.log("Yirp")
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  console.log("Someone tried to log in")
  var conString = "postgres://qkmmfvxz:YvJJxSK6Q-f2tOR9ErdoBj8CsxREtxAl@rogue.db.elephantsql.com:5432/qkmmfvxz" //Can be found in the Details page
  var client = new pg.Client(conString)
  client.connect(function(err) {
    if(err) {return console.error('could not connect to postgres', err)}

    client.query('select * from users where email = $1::text', [req.query.email], function(err, result) {

    if(err) {return console.error('error running query', err)}

    if(req.query.password === result.rows[0].password) {
      res.send(result.rows[0])
    } else {res.end()}


    

    client.end()
  })
})
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})