const express = require('express');
const router  = express.Router();

// GET home page.
router.get('/', (req, res, next) => {
  console.log(req.user);
  console.log("2", res.locals.user);
  res.render('index');
});

module.exports = router;