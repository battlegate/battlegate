const express = require('express');
const router  = express.Router();

// GET home page.
router.get('/home', (req, res, next) => {
  res.render('index');
});
//
router.get('/createbattle', (req, res, next) => {
  res.render('index');
});

router.get('/findbattle', (req, res, next) => {
  res.render('index');
});

router.get('/battle', (req, res, next) => {
  res.render('index');
});

router.get('/aboutus', (req, res, next) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('index');
});

router.get('/contact', (req, res, next) => {
  res.render('index');
});

module.exports = router;