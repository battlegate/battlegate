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
          password = req.body.password,
          email    = req.body.email;
    if(username === "" || password === "" || email === ""){
        console.log('ingresa algo')
        res.render("signup", {message: "Please fill out all fields"});
        return;
    }
  console.log(email)
      User.find({username}, "username", (err, user)=>{
        console.log(user)
         if (user.length>0){
             res.render("signup", {message:"The username already exists"});
             
             return;
         } else {
          User.find({email}, 'email', (err, emailAd)=>{
            if (emailAd.length>0){
             res.render("signup", {message:"The email already exists"});
             return;
           } else {
            const hashPass = bcrypt.hashSync(password, salt);
     
            const newUser = new User({
               username,
               password:hashPass,
               email
            });
     
            newUser.save(err=>{
                if (err) return res.render("auth/signup", { message: "Something went wrong" });
                 res.redirect("/");
            });
           }
         });
     
           
         }
        });

     
  
      });

      router.get("/auth/google", passport.authenticate("google", {
        scope: ["https://www.googleapis.com/auth/plus.login",
                "https://www.googleapis.com/auth/plus.profile.emails.read"]
      }));
      
      router.get("/auth/google/callback", passport.authenticate("google", {
        failureRedirect: "/",
        successRedirect: "/"
      }));

  router.get("/logout", (req, res, next) => {
    req.logout()
    res.redirect('/')
  });
  
  module.exports = router;
  