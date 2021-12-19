const { Pool } = require('pg');
const config = require('./postgres_config');

const db = new Pool(config);

// GET REVIEWS ENDPOINT METHODS

const getReviews = async (product_id, count = 5, page = 1, sort = 'newest') => {
  const sortTypes = {
    relevent: 'helpfulness',
    helpful: 'helpfulness',
    newest: 'date'
  }

  const queryString = 'SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product_id = $1 ORDER BY $2 desc LIMIT $3 OFFSET $4';
  const values = [product_id, sortTypes[sort], count, (count * page - count)];

  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.stack)
    })
}

const getPhotos = (review_id) => {
  const queryString = 'select id, url FROM photos WHERE review_id = $1'
  const values = [review_id]

  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.stack)
    })
}

// GET META DATA ENDPOINT METHODS

const getMetaRatings = (review_id) => {
  const queryString = 'SELECT rating, count(rating) FROM reviews WHERE product_id=$1 GROUP BY rating'
  const value = [review_id]

  return db
    .query(queryString, value)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.error(err.stack))
}

const getMetaRecommended = (review_id) => {
  const queryString = 'SELECT recommend, count(recommend) FROM reviews WHERE product_id=$1 GROUP BY recommend';
  const value = [review_id]

  return db
    .query(queryString, value)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.error(err.stack))
}

const getCharacteristics = (review_id) => {
  const queryString = 'SELECT characteristics.name, MAX(characteristics.id) as id, AVG(characteristics_reviews.value) FROM characteristics FULL JOIN characteristics_reviews ON characteristics_reviews.characteristic_id = characteristics.id WHERE characteristics.product_id=$1 GROUP BY characteristics.name;';
  const value = [review_id]

  return db
  .query(queryString, value)
  .then((res) => {
    return res.rows;
  })
  .catch((err) => console.error(err.stack))
}

// POST REVIEWS METHODS

const addReview = (reviewObj) => {
  const queryString = 'INSERT into public.reviews (product_id, rating, summary, body, recommend, reviewer_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id ;'
  const values = [reviewObj.product_id, reviewObj.rating, reviewObj.summary, reviewObj.body, reviewObj.recommend, reviewObj.reviewer_name]

  return db.query(querySting, values)
    .then(res => {
      console.log(res.rows);
      return res.rows
    })
    .catch(err => console.error(err))
}

const addPhoto = (review_id, photo) => {
  const queryString = 'INSERT into public.photos (review_id, url) VALUES ($1, $2)'
  const values = [review_id, photo]

  return db.query(querySting, values)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.error(err))
}

const addCharacteristics = (characteristic_id, review_id, value) => {
  const queryString = 'INSERT into public.characteristics_reviews (characteristic_id, review_id, value) VALUES ($1, $2, $3)'
  const values = [characteristic_id, review_id, value]

  return db.query(querySting, values)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.error(err))
}

// UPDATE HELPFUL AND REPORT MEHTODS
const helpful = (id, direction) => {

}

const reported = (id) => {

}

module.exports = {
  getReviews: getReviews,
  getPhotos: getPhotos,
  getMetaRatings: getMetaRatings,
  getMetaRecommended: getMetaRecommended,
  getCharacteristics:getCharacteristics,
  addReview: addReview,
  addPhoto: addPhoto,
  addCharacteristics: addCharacteristics
}