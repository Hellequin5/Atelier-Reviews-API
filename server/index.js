const express = require('express');
const app = express();
const axios = require('axios');
const db = require('../db')
const port = 3000;

app.use(express.json());

app.get('/reviews', async (req, res) => {
  const params = req.query;
  let test = await db.getReviews(params.product_id, params.count, params.page, params.sort);
  // console.log(test);
  for (var i = 0; i < test.length; i++) {
    let photos = await db.getPhotos(test[i].id)
    test[i].photos = photos;
  }
  let result = {
    product: params.product_id,
    page: params.page,
    count: params.count,
    results: test
  }
  res.send(result);
})

app.get('/reviews/meta', async (req, res) => {
  const id = req.query.product_id;

  let ratings = await db.getMetaRatings(id);
  let recommended = await db.getMetaRecommended(id);
  let characteristics = await db.getCharacteristics(id);
  res.send('test');
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
