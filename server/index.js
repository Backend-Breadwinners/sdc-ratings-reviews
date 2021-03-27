const express = require('express');
const app = express();
const pool = require('../db/index.js');
const db = require('./queries.js')
const port = 5000;
const cors = require('cors')


//=====================
//     Middleware
//=====================
app.use(express.json()); // => req.body
app.use(cors());


//=====================
//      Routes
//=====================


//======get reviews==========
app.get('/reviews/:id', (req, res) => {
  const { id } = req.params;
   db.getAllReviews(id, (err, results) => {
    if (err) {
      console.log('ERROR WITH GET REQUEST FOR REVIEWS', err)
      res.sendStatus(404);
    } else {
      res.send(results.rows)
    }
  });
});


//========get meta data===============
app.get('/reviews/meta/', (req, res) => {
      res.send({
        "product_id": "18201",
        "ratings": {
          2: 1,
          3: 1,
          4: 2,
        },
        "recommended": {
          0: 5
        },
        "characteristics": {
          "Size": {
            "id": 14,
            "value": "4.0000"
          },
          "Width": {
            "id": 15,
            "value": "3.5000"
          },
          "Comfort": {
            "id": 16,
            "value": "4.0000"
          }
        }
      })
    })

//=======post review=========
app.post('/reviews', (req, res) => {
  const fullBody = [req.body.product_id, req.body.rating, new Date().toISOString(), req.body.summary, req.body.body, req.body.recommend, false, req.body.reviewer_name, req.body.reviewer_email, req.body.response, 0];
  console.log('fullBody: ', fullBody)
  db.postReviews(fullBody, (err, results) => {
    if (err) {
      console.log('ERROR WITH POST REQUEST: ', err)
      res.sendStatus(404);
    } else {
      res.send('POSTED SUCCESSFULLY!');
    }
  })
})

//============put request helpfulness===============
app.put('/reviews/:review_id/helpful', (req, res) => {
  let { review_id } = req.params
  db.reviewHelpful( review_id, (err, results) => {
    if (err) {
      console.log('ERROR PUT REQUEST: ', err)
      res.sendStatus(404);
    } else {
      res.send('Helpful Updated!')
    }
  })
})

//============put request report===============
app.put('/reviews/:review_id/report', (req, res) => {
  let { review_id } = req.params
  db.reviewReport( review_id, (err, results) => {
    if (err) {
      console.log('ERROR PUT REQUEST: ', err)
      res.sendStatus(404);
    } else {
      res.send('This has been reported')
      console.log('reviewId: ', review_id)
    }
  })
})

//=============================================
//=============================================


//=========spinning up the server=============
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`)
})
