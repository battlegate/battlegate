const express = require('express');
const router  = express.Router();
const Battle = require("../models/Battle");

router.get('/createbattle', (req, res, next) => {
    res.render('create');
});

router.post('/createbattle/new', (req, res, next) =>{
  console.log(req.body);
  const newBattle = new Battle({
    title: req.body.title,
    category: req.body.place,
    location: req.body.description,
    content: req.body.descriptionEvent      
    //pathPicture: `/uploads/${req.file.filename}`
  });
  
  newBattle.save()
    .then(articleCreated => res.redirect("/profile"))
    .catch(err => console.log(err));
});
  
module.exports = router;