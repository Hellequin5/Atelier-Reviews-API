-- \c reviews_api;

-- DROP TABLE IF EXISTS reviews;

-- CREATE TABLE reviews(
--   review_table_id SERIAL PRIMARY KEY,
--   id INT NOT NULL,
--   product_id INT NOT NULL,
--   rating INT NOT NULL,
--   date DATE DEFAULT CURRENT_DATE,
--   summary VARCHAR(255) NOT NULL,
--   body VARCHAR (1000) NOT NULL,
--   recommend BOOLEAN DEFAULT false,
--   reported BOOLEAN DEFAULT false,
--   reviewer_name VARCHAR (255) DEFAULT null,
--   reviewer_email VARCHAR (255) DEFAULT null,
--   response VARCHAR (1000) DEFAULT null,
--   helpfulness INT DEFAULT 0
-- );