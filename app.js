const express = require('express')
const http    = require("http")
const logger  = require("morgan")
const path    = require("path")


//setup mini app for testing...
const app = express()
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'dist')))
app.use("/dist", express.static(path.join(__dirname, 'dist'))) //for testing
app.use("/images", express.static(path.join(__dirname, 'images'))) //for testing
app.use((req, res) => {
  res.status(404).send("Not found.")
})
app.use((err, req, res) => {
  res.status(err.status || 500).send(err.toString())
})

  //HTTP server
const port = 3000
var serverHttp = http.createServer(app)
serverHttp.on('error', function(err) {
  console.dir(err, {colors: true, depth: 10})
})
serverHttp.listen(port, function(){
  console.log('Express server listening on port ' + port)
})

process.on('uncaughtException', function (err) {
  console.dir(err, {colors: true, depth: 10})
  process.exit(1)
})
