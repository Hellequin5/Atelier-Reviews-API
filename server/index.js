const express = require('express');
const app = express();
const axios = require('axios');
const db = require('../db')
const port = 3000;

app.use(express.json());

app.get('/reviews', async (req, res) => {
  console.log(typeof req.query.product_id)
  const params = req.query;
  let test = await db.getReviews(Number(params.product_id), Number(params.count) ? Number(params.count) : 5, Number(params.page) ? Number(params.page) : 1, params.sort ? params.sort : 'newest');
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

  // needs to be cleaned up, but using for initial deployment
  const result = {
    product_id: id,
    ratings: ratings,
    recommended: recommended,
    characteristics: characteristics
  }
  res.send(result);
})

app.post('/reviews', async (req, res) => {
  const initialObj = {
    product_id: req.query.product_id,
    rating: req.query.rating,
    summary: req.query.summary,
    body: req.query.body,
    recommend: req.query.recommend,
    reviewer_name: req.query.name
  }

  const review_id = await db.addReview(initialObj);
  for (let i = 0; i < req.query.photos.length; i++) {
    await db.addPhoto(review_id, req.query.photos[i])
  }
  for (let key of req.query.characteristics) {
    await db.addCharacteristics(key, review_id, req.query.characteristics[key])
  }
  res.send(review_id);
})

app.put('/reviews/:review_id/helpful', async (req, res) => {
  // console.log(req.params)
  await db.helpful(req.params.review_id);
  res.status(204).send();
})

app.put('/reviews/:review_id/report', async (req, res) => {
  await db.reported(req.query.review_id);
  res.status(204);
})

app.get('/test', async (req, res) => {
 res.status(200).send('received')
});

app.listen(port, () => {
  console.log(`Reviews API is listening at localhost:${port}`)
})
