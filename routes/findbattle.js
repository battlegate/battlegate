const express = require('express');
const router  = express.Router();

router.get('/findbattle', (req, res, next) => {
    res.render('find');
});

module.exports = router;