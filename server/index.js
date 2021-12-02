const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

app.use(express.json());

app.get('/reviews', (req, res) => {

})

app.get('/reviews/meta', (req, res) => {

})

app.post('/reviews', (req, res) => {

})

app.put('/reviews/:review_id/helpful', (req, res) => {

})

app.put('/reviews/:review_id/report', (req, res) => {

})

app.listen(port, () => {
  console.log(`Reviews API is listening at localhost:${port}`)
})
