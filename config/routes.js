const express = require('express')
const router = express.Router()

// // ROOT
// router.get('/', (req, res) => {
//   res.status(200).json({
//     api_version: 'v1.0.0',
//     posts: '/posts'
//   })
// })
// index
var candyshop = [
{'id': 1, 'name': 'Chewing Gum', 'color': 'Red'},
{'id': 2, 'name': 'Pez', 'color': 'Green'},
{'id': 3, 'name': 'Marshmallow', 'color': 'Pink'}]

var validColors = ['Red','Green','Blue','Pink']

router.get('/candies', (req, res) => {
  res.status(200).json(candyshop)
})
// show
router.get('/candies/:id', (req, res) => {
  res.status(200).json(candyshop[req.params.id - 1])
})
// create
router.post('/candies', (req, res) => {
  if (req.body.color == "haha") {
    res.status(422).json('invalid color')
  }
  res.status(201).json({
    id: req.body.id,
    name: req.body.name,
    color: req.body.color
    // title: req.body.title
  })
  var newCandy = {
    id: parseInt(req.body.id),
    name: req.body.name,
    color: req.body.color
  }
  candyshop.push(newCandy)
  // var candy = [newCandy]
  // if (validColors.indexOf(newCandy.color) !== -1) {
  // candyshop.push(newCandy)
  // }
  // else{
  //   res.status(422).json({message: 'wrong color'})
  // }
})
// update
router.put('/candies/:id', (req, res) => {
  candyshop[req.params.id - 1].id = req.body.id
  candyshop[req.params.id - 1].name = req.body.name
  candyshop[req.params.id - 1].color = req.body.color
  res.status(200).json(candyshop[req.params.id - 1])
})
// deleted
router.delete('/candies/:id', (req, res) => {
  res.status(200).json({results: `candies ${req.params.id} deleted`})
  candyshop.splice(req.params.id - 1, 1)
})

module.exports = router
