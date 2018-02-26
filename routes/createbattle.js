const express = require('express');
const router  = express.Router();

router.get('/createbattle', (req, res, next) => {
    res.render('create');
});

module.exports = router;