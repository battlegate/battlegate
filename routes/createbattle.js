const express = require('express');
const router  = express.Router();
const Battle  = require('../models/Battle')

router.get('/createbattle', (req, res, next) => {
    res.render('create');
});

router.post('/createbattle', (req, res, next)=>{
    const name = req.body.name,


}),
module.exports = router;