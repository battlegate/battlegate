const express = require('express');
const router  = express.Router();
const Battle  = require('../models/Battle')

router.get('/createbattle', (req, res, next) => {
    res.render('create');
});

router.post('/createbattle', (req, res, next)=>{
    const name = req.body.name,
          date = req.body.date,
          category =req.body.category,
          place= req.body.place,
          type=req.body.type;
    
    if(name === "" || date === "" || category === "" || place === ""||type === ''){
        res.render("create", {message: "Please fill out all fields"});
        return;
    }

    const newBattle = new Battle({
        name,
        date,
        category,
        place,
        type,
     });

     newBattle.save(err=>{
        if (err) return res.render("/createbattle", { message: "Something went wrong" });
         res.redirect("/createbattle");
    });

}),
module.exports = router;