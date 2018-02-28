const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require('passport')
const salt = bcrypt.genSaltSync(10);
const ensureLogin = require ('connect-ensure-login')

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
  
  router.get('/signup', (req, res, next) => {
    res.render('signup');
  })
  .post("/signup", (req,res,next)=>{
    const username = req.body.username,
          password = req.body.password;
    if(username === "" || password === ""){
        console.log('ingresa algo')
        res.render("signup", {message: "Indicate username and password"});
        return;
    }
  
      User.findOne({username}, "username", (err, user)=>{
         if (user !== null){
             res.render("signup", {message:"The username already exists"});
             return;
         }
  
         const hashPass = bcrypt.hashSync(password, salt);
  
         const newUser = new User({
            username,
            password:hashPass
         });
  
         newUser.save(err=>{
             if (err) return res.render("auth/signup", { message: "Something went wrong" });
              res.redirect("/");
         });
  
      });
  });

  router.get("/logout", (req, res, next) => {
    if (!req.session.currentUser) { res.redirect("/"); return; }
  
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
  });
  
  module.exports = router;
  