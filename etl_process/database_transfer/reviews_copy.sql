-- COPY reviews (id,product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
-- FROM '/home/patrick/SDC/csv data files/reviews.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY characteristics (id, product_id, name)
-- FROM '/home/patrick/SDC/csv data files/characteristics.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY photos (id, review_id, url)
-- FROM '/home/patrick/SDC/csv data files/reviews_photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY characteristics_reviews (id, characteristic_id, review_id, value)
-- FROM '/home/patrick/SDC/csv data files/characteristic_reviews.csv'
-- DELIMITER ','
-- CSV HEADER;