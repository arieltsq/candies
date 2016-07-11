/* globals describe it before */
const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../app')
const api = supertest('http://localhost:3000')

describe('GET /candies', () => {
  it('should return a 200 response', (done) => {
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
  it('should return an object that has a field called "name"', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[0]).to.have.property('name')
      done()
    })
  })
  it('should return all the records in the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.lengthOf(4)
      done()
    })
  })
})

describe('POST /candies', () => {
  // simulate successful candy creation before running any tests
  before((done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 5,
      'name': 'lollipop',
      'color': 'red'
    }).end(done)
  })
  // simulate unsuccessful candy creation before running any tests
  it('should return a 422 response if the field color is wrong', (done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 6,
      'name': 'chewing gum',
      'color': 'blue'
    })
    .expect(422, done)
  })
  it('should return an error if the color is wrong', (done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 7,
      'name': 'cola sweet',
      'color': 'blue'
    })
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.message).to.equal('invalid color')
      done()
    })
  })
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should add a candy object to the collection', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[response.body.length - 1].name).to.equal('lollipop')
      done()
    })
  })
})

describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an object that has the fields "name" and "color"', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.deep.property('name')
      expect(response.body).to.have.deep.property('color')
      done()
    })
  })
})

describe('PUT /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.put('/candies/1')
    .set('Accept', 'application/json')
    .send({
      'id': 1,
      'name': 'big sweet',
      'color': 'pink'
    })
    .expect(200, done)
  })
  it('should update a candy document', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.name).to.equal('big sweet')
      expect(response.body.color).to.equal('pink')
      done()
    })
  })
})

describe('DELETE /candies/:id', () => {
  it('should remove a candy document', (done) => {
    api.delete('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.equal('candy 1 deleted')
      done()
    })
  })
})
