const express = require('express');
const router  = express.Router();
<<<<<<< HEAD
const Battle  = require('../models/Battle')
=======
const Battle = require("../models/Battle");
>>>>>>> fri

router.get('/createbattle', (req, res, next) => {
    res.render('create');
});

<<<<<<< HEAD
router.post('/createbattle', (req, res, next)=>{
    const name = req.body.name,
          date = req.body.date,
          email= req.body.email;


}),
=======
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
    .then(articleCreated => res.redirect("/"))
    
    .catch(err => console.log(err));
});
  
>>>>>>> fri
module.exports = router;