const express = require('express');
const router  = express.Router();

router.get('/aboutus', (req, res, next) => {
  res.render('aboutus');
});

module.exports = router;