const express = require('express');
const router  = express.Router();

router.get('/how', (req, res, next) => {
    res.render('how');
});

module.exports = router;
  