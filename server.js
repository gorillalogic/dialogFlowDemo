'use strict'

const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')
const proxy = require('./proxy')


const app = asyncify(express())
const port = 5001
const server = http.createServer(app)

app.use(bodyParser.json({limit: '100mb', type:'application/json'}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit:52428800}))
app.use('/',proxy)

app.use((err, req, res, next) => {
    if (err.message.match(/not found/)) {
        return res.status(404).send({error: err.message})
    }    
    res.status(500).send({error: err.message})
})
function handleFatalError (err) {
    console.log(`[fatal error] ${err.message}`)
    console.log(err.stack)
    process.exit(1)
}
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
server.listen(port, () => {
    console.log(`[age-calculator] server listening on port 5001`)
}) 


