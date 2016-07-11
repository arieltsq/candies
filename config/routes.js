const express = require('express')
const router = express.Router()

let arr = [{id: 1, name: 'Chewing Gum', color: 'Red'},
  {id: 2, name: 'Pez', color: 'Green'},
  {id: 3, name: 'Marshmallow', color: 'Pink'},
  {id: 4, name: 'Candy Stick', color: 'Blue'}]

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// INDEX
router.get('/candies', (req, res) => {
  res.status(200).json(arr)
})

// SHOW
router.get('/candies/:id', (req, res) => {
  res.status(200).json(arr[req.params.id - 1])
})

// CREATE
router.post('/candies', (req, res) => {
  var newCandy = {
    id: req.body.id,
    name: req.body.name,
    color: req.body.color
  }

  if (req.body.color === 'blue') {
    res.status(422).json({message: 'invalid color'})
  } else {
    res.status(201).json({
      message: 'candy created',
      id: req.body.id,
      name: req.body.name,
      color: req.body.color
    })
    arr.push(newCandy)
  }
})

// UPDATE
router.put('/candies/:id', (req, res) => {
  arr[req.params.id - 1].id = req.body.id
  arr[req.params.id - 1].name = req.body.name
  arr[req.params.id - 1].color = req.body.color
  res.status(200).json(arr[req.params.id - 1])
})

// DELETE/DESTROY
router.delete('/candies/:id', (req, res) => {
  res.status(200).json(`candy ${req.params.id} deleted`)
  arr.splice(req.params.id - 1, 1)
})
module.exports = router
