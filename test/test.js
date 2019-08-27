const supertest = require('supertest')
const should = require('should')

// this agent refers to PORT where program is running

const server = supertest.agent('http://localhost:3000')

// UNIT test begin

describe("SAMPLE unit test", function(){
  //  #1 should return home page
  it('should return home page', function(done){
    // calling home page api
    server.get('/')
    .expect('Content-type',/json/)
    .expect(200) //This is the HTTP response
    .end(function(err,res){
      res.status.should.equal(200)
      res.body.error.should.equal(false)
      done()
    })
  })

  it('should add two numbers', function(done){
    // calling ADD api
    server.post('/add')
    .send({num1 : 10, num2 : 20})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200)
      res.body.error.should.equal(false)
      res.body.data.should.equal(31)
      done()
    })
  })

  it('should return 404', function(done){
    server
    .get('/random')
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404)
      done()
    })
  })
})