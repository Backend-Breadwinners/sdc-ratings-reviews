const express = require('express');
const app = express();
const pool = require('./db');
const db = require('./queries.js')
const port = 5000;
const Router = require('express-promise-router')
const router = new Router();

module.exports = router;


//=====================
//     Middleware
//=====================
app.use(express.json()); // => req.body



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
      let upperInfo = {
        product: req.params.id,
        page: 0,
        count: 100,
        results: [...results.rows]
      }
      res.send(upperInfo)
    }
  });
});


//========get meta data===============
app.get('/reviews/meta/', (req, res) => {
  let { id } = req.params;
    db.getAllMeta( id, (err, results) => {
    if (err) {
      console.log('ERROR WITH GET REQUEST FOR META DATA', err)
      res.sendStatus(404);
    } else {
      res.send(results.rows)
    }
  })
})

//=======post review=========
app.post('/reviews', (req, res) => {
  const fullBody = [req.body.product_id, req.body.rating, req.body.date, req.body.summary, req.body.body, req.body.recommend, req.body.reported, req.body.reviewer_name, req.body.reviewer_email, req.body.response, req.body.helpfulness];
  console.log('req.body: ', req.body)
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
    }
  })
})

//=============================================
//=============================================


//=========spinning up the server=============
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`)
})
