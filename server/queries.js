const pool = require('../db/index.js');


//===========================
//     GET ALL REVIEWS
//===========================
const getAllReviews = (id, cb) => {
  pool.query(`SELECT *
  FROM reviews,
  LATERAL (
    SELECT JSON_AGG (
      json_build_object (
        'id',  "reviews-photos".id,
        'url', "reviews-photos".url
      )) AS photos
    FROM "reviews-photos"
    WHERE "reviews-photos".review_id = reviews.id
    ) AS photos
  WHERE reviews.product_id = ${id} ORDER BY date DESC, helpfulness DESC`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results)
    }
  });
};

//===========================
//     GET ALL META
//===========================
const getAllMeta = cb => {
  pool.query('SELECT * FROM characteristics WHERE ID < 10', (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}

//===========================
//      POST REVIEWS
//===========================
const postReviews = (postReview, cb) => {
  pool.query(`INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, postReview, (err, results) => {
    console.log('postReview: ', postReview)
    if (err) {
      cb(err, null);
    } else {
      cb(null, results)
    }
  });
};

//===========================
//  MARK REVIEW AS HELPFUL
//===========================
const reviewHelpful = (id, cb) => {
  let helpfulQuery = 'UPDATE REVIEWS SET helpfulness=(helpfulness + 1) WHERE id=$1';
  pool.query(helpfulQuery, [id], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}

//===========================
//     REPORT REVIEW
//===========================
const reviewReport = (id, cb) => {
  let report = 'UPDATE REVIEWS SET reported=true WHERE id=$1';
  pool.query(report, [id], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}

module.exports = {
  getAllReviews,
  getAllMeta,
  postReviews,
  reviewHelpful,
  reviewReport
}