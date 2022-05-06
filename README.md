# Atelier Reviews API

## Microservice Project

## RESTful API For 'Ratings and Reviews' On E-Commerce Site

For this project I was given a set of CSV files containing millions of records for the 'Ratings and Reviews' section of an e-commerce website. My job was to produce a scalable API that had to serve this data to legacy front end code with 8 different endpoints. The minimum requirements where to serve 200 clients per second with <50ms average response times. In testing with loader.io the final service was able to achieve 500 requests per second with an aveage request time of 32ms. This testing was done on single service with no scalling, load balancing, or caching using a single AWS EC2 t2.micro.

### Technologies Used

- Node.js
- Express
- PostgreSQL
- Docker

### Testing

- Jest
- Loader.io
