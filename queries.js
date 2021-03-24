const pool = require('./db');


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

// const getAllReviews = (id, cb) => {
//   pool.query(
//     `SELECT
//     reviews.id AS review_id, reviews.rating AS rating, reviews.date AS date, reviews.summary AS summary, reviews.body AS body, reviews.recommend AS recommend, reviews.reported AS reported, reviews.reviewer_name AS reviewer_name, reviews.response AS response, reviews.helpfulness AS helpfulness,
//        JSON_AGG(
//          ROW_TO_JSON(
//            (SELECT r
//             FROM (SELECT "reviews-photos".id as id,
//                          "reviews-photos".url as url
//                   ) r
//            ),
//            true
//          )
//        ) AS photos
//   FROM reviews
//   INNER JOIN "reviews-photos"
//   ON "reviews-photos".review_id = reviews.id
//   WHERE reviews.product_id = ${id}
//   GROUP BY reviews.id`, (err, results) => {
//     if (err) {
//       cb(err, null);
//     } else {
//       cb(null, results)
//     }
//   });
// };

// const getAllReviews = (id, cb) => {
//   pool.query(
//     `SELECT
//        r.id AS review_id, r.rating AS rating, r.date AS date, r.summary AS summary, r.body AS body, r.recommend AS recommend, r.reported as reported, r.reviewer_name AS reviewer_name, r.reviewer_email AS reviewer_email, r.response AS response, r.helpfulness AS helpfulness,
//          ARRAY_AGG (
//            json_build_object('id',  "reviews-photos".id,
//                              'url', "reviews-photos".url)
//             ORDER BY
//               r.product_id
//          ) photos
//         FROM reviews r
//         INNER JOIN "reviews-photos" ON r.id = "reviews-photos".id
//         WHERE r.product_id = ${id}
//         GROUP BY r.id`, (err, results) => {
//     if (err) {
//       cb(err, null);
//     } else {
//       cb(null, results)
//     }
//   });
// };

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