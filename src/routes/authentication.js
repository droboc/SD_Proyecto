const express=require("express");
const router=express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');


router.get('/signin',(req,res)=>{
    res.render('auth/signin');
});


router.post('/signin', (req, res, next) => {
    req.check('username', 'Username is Required').notEmpty();
    req.check('password', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
      req.flash('message', errors[0].msg);
      res.redirect('/signin');
    }
    passport.authenticate('local.signin', {
      successRedirect: '/routers',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);
  });

  router.get('/routers', isLoggedIn, (req, res) => {
    res.render('routers/routers');
  });
  

module.exports=router;