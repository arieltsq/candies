/* globals describe it before */

const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../app')
const api = supertest('http://localhost:3000')


describe('GET /candies', (done) => {
  it('should return a 200 response', () => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    })
  })
  it('should return an object that has a field called "name" and "color"' , (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[0]).to.be.property('name')
      expect(response.body[0]).to.be.property('color')

      done()
    })
  })
  it('should return all the records in the database' , (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.length).to.be.equal(3)
      done()
    })
  })
})
// TESTING on the GET /candies/:id
describe('GET /candies/:id', (done) => {
  it('should return a 200 response', () => {
    api.get('/candies/3')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an object containing the fields "name" and "color"', (done) => {
    api.get('/candies/3')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.property('name')
      expect(response.body).to.be.property('color')
      done()
    })
  })
})

// testing on the post candies
describe('POST /candies', (done) => {
  before((done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 4,
      'name': 'lollipop',
      'color': 'red'
    }).end(done)
  })
  it('should return a 200 response', () => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should add a candy object to the collection and return it', (done) => {

    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[response.body.length -1].name).to.equal('lollipop')
      expect(response.body[response.body.length -1].color).to.equal('red')

      done()
    })
  })
  it('should return a 422 response if the field color is wrong', () => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 4,
      'name': 'lollipop',
      'color': 'haha'
    })
    .expect(422, done)
  })
  it('should return an error message if the color field is wrong', (done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 4,
      'name': 'lollipop',
      'color': 'haha'
    })
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.equal('invalid color')
      done()
    })
  })
  it('should return an error if the color is wrong', (done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 4,
      'name': 'lollipop',
      'color': 'haha'
    })
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.equal('invalid color')
      done()
    })
  })

})

// Testing on the UPDATE
describe('PUT /candies/:id', (done) => {
  before((done) => {
    api.put('/candies/4')
    .set('Accept', 'application/json')
    .send({
      'id': 4,
      'name': 'Bagel',
      'color': 'Rainbow'
    }).end(done)
  })
  it('should return a 200 response', () => {
    api.get('/candies/4')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should update a candy document', (done) => {
    api.get('/candies/4 ')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.name).to.equal('Bagel')
      done()
    })
  })
})
// DELETE /candies/:id
describe('DELETE /candies/:id', () => {
  before((done) => {
    api.delete('/candies/2')
    .set('Accept', 'application/json')
    .end(done)
  })
  it('should remove a candy document', (done) => {
    api.get('/candies/2')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.name).to.equal('Marshmallow')

      done()
    })
  })

})
