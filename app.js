const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./config/routes')

// app.set('views'. './views')
// app.set('view engine', 'ejs')

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', router)

app.get('/', (req, res) => {
  res.render('index', {title: 'Candy Shop'})
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
