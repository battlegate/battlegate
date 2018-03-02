const express = require('express');
const router  = express.Router();
const User  = require ("../models/User.js")


router.get('/profile', (req, res, next) => {
  User.findById(req.user._id)
    .then(result => res.render('profile',{user:result}))
  
});

module.exports = router;
