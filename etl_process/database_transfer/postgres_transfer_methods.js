const {Pool, Client} = require('pg');

const db = new Pool({
  user: "patrick",
  host: "localhost",
  database: "reviews_api",
  password: "Password1",
  port: "5432"
})

 const reviewCopy = async (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) => {
  const queryString = 'INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)'
  const values =[id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness]

  try {
    const res = await db.query(queryString, values)
  } catch (err) {
    console.log(err.stack)
  }
}

const photosCopy = async (id, review_id, url) => {
  const queryString = 'INSERT INTO photos (id, review_id, url) VALUES ($1, $2, $3)'
  const values = [id, review_id, url]

  try {
    const res = await db.query(queryString, values);
  } catch (err) {
    console.log(err.stack);
  }
}

const characteristicsCopy = async (id, product_id, name) => {
  const queryString = 'INSERT INTO characteristics (id, product_id, name) VALUES ($1, $2, $3)';
  const values =[id, product_id, name];


  db.query(queryString, values, (err, response) => {
    err ? console.log(err) : null;
  });

}

const characteristicReviewsCopy = async (id, characteristic_id, review_id, value) => {
  const queryString = 'INSERT INTO characteristics_reviews (id, characteristic_id, review_id, value) VALUES ($1, $2, $3, $4)';
  const values = [id, characteristic_id, review_id, value];

  try {
    const res = await db.query(queryString, values);
  } catch (err) {
    console.log(err.stack);
  }
}

const reviewTest = async (id = 1) => {
  const queryString = 'SELECT * FROM reviews WHERE id=$1';
  const value = [id];


    await db.query(queryString, value, (err, response) => {
      if (err) {
        console.log(err)
      } else {
        console.log(response);
        console.log(typeof response.rows[0].id)
      }
    })

}

module.exports = {
  reviewCopy: reviewCopy,
  reviewTest: reviewTest,
  photosCopy: photosCopy,
  characteristicsCopy: characteristicsCopy,
  characteristicReviewsCopy: characteristicReviewsCopy,
}

