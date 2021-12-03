const { Pool } = require('pg');
const config = require('./postgres_config');

const db = new Pool(config);

// GET REVIEWS ENDPOINT METHODS

const getReviews = async (product_id, count, page, sort) => {
  const sortTypes = {
    relevent: 'helpfulness',
    helpful: 'helpfulness',
    newest: 'date'
  }

  const queryString = 'SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product_id = $1 ORDER BY $2 desc LIMIT $3 OFFSET $4';
  const values = [product_id, sortTypes.sort, count, (count * page - count)];

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
  const queryString = 'SELECT characteristics.name, AVG(characteristics_reviews.value), characteristics.name FROM characteristics FULL JOIN characteristics_reviews ON characteristics_reviews.characteristic_id = characteristics.id WHERE characteristics.product_id=$1 GROUP BY characteristics.name;';
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

}

const addCharacteristics = (reviewObj) => {

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
  getCharacteristics:getCharacteristics
}