const indexRouter = require('../routes/index');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

test('GET "/" works', (done) => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect({ project: "Where's Wally", author: 'dziubenzo' })
    .expect(200, done);
});
