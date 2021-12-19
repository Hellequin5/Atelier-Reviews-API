const csv = require('csv-parser');
const {parse} = require('csv-parse');
const fs = require('fs');
const db = require('./postgres_transfer_methods')

let photosUploadStream = async (start, end) => {
  let config = {
    from: start,
    to: end,
    columns: true,
    relax_column_count: true
  }

  fs.createReadStream('/home/patrick/SDC/csv data files/reviews_photos.csv')
    .pipe(parse(config))
    .on('data', (data) => {
      console.log(`${data.id} photos`);
      db.photosCopy(data.id, data.review_id, data.url);
    })
    .on('error', (err) => console.log(err))
    .on('end', () => console.log(`photos done`))
}

let characteristicUploadStream = async (start, end) => {
  let config = {
    // from: start,
    // to: end,
    columns: true,
    relax_column_count: true
  }

  fs.createReadStream('/home/patrick/SDC/csv data files/characteristics.csv')
    .pipe(parse(config))
    .on('data', (data) => {
      console.log(`${data.id} characteristics`);
      db.characteristicsCopy(data.id, data.product_id, data.name)
    })
    .on('error', (err) => console.log(err))
    .on('end', () => console.log(`characteristics done`))
}

let characteristicReviewUploadStream = async (start, end) => {
  let config = {
    from: start,
    to: end,
    columns: true,
    relax_column_count: true
  }

  fs.createReadStream('/home/patrick/SDC/csv data files/characteristic_reviews.csv')
    .pipe(parse(config))
    .on('data', (data) => {
      console.log(`${data.id} characteristic reviews`);
      db.characteristicReviewsCopy(data.id, data.characteristic_id, data.review_id, data.value)
    })
    .on('error', (err) => console.log(err))
    .on('end', () => console.log(`characteristics reviews done`))
}


let reviewUploadStream =  async (start, end) => {
  let config = {
    from: start,
    to: end,
    columns: true,
    relax_column_count: true
  }

  let stream = fs.createReadStream('/home/patrick/SDC/csv data files/reviews.csv');
  //Current two pipe test
  stream
    .pipe(parse(config))
    // .pipe(csv({
    //   mapValues: ({header, index, value}) => {
    //     if (header === 'id' || header === 'product_id') {
    //       value = Number(value);
    //     } else if (header === 'rating' || header === 'helpfulness') {
    //       let num = Number(value);
    //       num ? value = num : value = 0;
    //     } else if (header === 'recommend' || header === 'reported') {
    //       value === 'true' ? value = true : value = false;
    //     }
    //     return value;
    //   }
    // }))

    .on('data', (data) => {
      // console.log(`${data.id} reviews`);
      if (!Number(data.helpfulness)) {
        data.helpfulness = '0';
      }
      data.recommend === 'true' ? data.recommend = 'true' : data.recommend = 'false';
      data.recommend === 'true' ? data.reported = "true" : data.reported = "false";
      db.reviewCopy(data.id, data.product_id, data.rating, data.date, data.summary, data.body, data.recommend, data.reported, data.reviewer_name, data.reviewer_email, data.response, data.helpfulness);
      // if (currentDump === dumpVar) {
      //   await new Promise(resolve => {
      //     uploadStream.on('drain', resolve);
      //     currentDump= 0;
      //   })
      // }
    })
    .on('error', (err) => console.log(err.message))
    .on('end', () => {
      console.log('reviews done teeeeeeeeeeeeeeessssssssssssssssssssttttttttttttttt');
    });
}

let run = async () => {
  let small = 1;
  let large = 100000;
  // for (i = 1; i <= 30; i++) {
    await reviewUploadStream(small, large);
  //   global.gc();
  //   small = small + 100000;
  //   large = large + 100000;
  // }
  // small = 1;
  // large = 1000000;
  // for (i = 1; i <= 20; i++) {
  //   await photosUploadStream(small, large);
  //   small = small + 1000000;
  //   large = large + 1000000;
  // }
  // small = 1;
  // large = 1000000;
  // for (i = 1; i <= 20; i++) {
  //   await characteristicUploadStream(small, large);
  //   small += 1000000;
  //   large += 1000000;
  // }
  // small = 1;
  // large = 1000000;
  // for (i = 1; i <= 20; i++) {
  //   await characteristicReviewUploadStream(small, large);
  //   small += 1000000;
  //   large += 1000000;
  // }
}

reviewUploadStream(5000001, 7000000);