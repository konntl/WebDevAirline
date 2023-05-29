import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import * as model from '../models/model_postgres.js';

passport.use(new LocalStrategy({usernameField:'username',passwordField:'password'},function verify(username, password, cb) {
  model.findUser(username, function(err, row) {
  if (err) { return cb(err); }
  if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  const ourSalt = new Buffer.from(row[0].Salt, "hex");
  crypto.pbkdf2(password, ourSalt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return cb(err); }
    const ourPass = new Buffer.from(row[0].Password, "hex");
    if (!crypto.timingSafeEqual(ourPass, hashedPassword)) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, row);
  });
})
}));

const router = express.Router();

passport.serializeUser(function(row, cb) {
  const user = row[0];
  let admin = false;
  if(row[1]){
    admin = true;
  }
  return process.nextTick(function() {
    cb(null, { id: user.ID, admin: admin, username: user.Username, fname: user.Fname, lname: user.Lname, email: user.Email, cellphone: user.Cellphone });
  });
});

passport.deserializeUser(function(user, cb) {
  return process.nextTick(function() {
    return cb(null, user);
  });
});

router.route('/sign-in').get(function (req, res) {
  res.render('signIn', {layout:'main'});
})

router.post('/sign-in/password', 
  passport.authenticate('local', { failureRedirect: '/sign-in', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/sign-out', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.route("/sign-up").post((req,res)=>{
  let Salt = crypto.randomBytes(16);
  let ID=null;
  let Fname=req.body.Fname;
  let Lname=req.body.Lname;
  let Email=req.body.Email;
  let Cellphone=req.body.Cellphone;
  let Username=req.body.Username;
  let NewsLetter=req.body.NewsLetter;
  
  crypto.pbkdf2(req.body.Password, Salt, 310000, 32, 'sha256',function(err,hashedPassword){
    if(err){return nextTick(err);}
      model.insertUser(ID,Fname,Lname,Email,Cellphone,Username,hashedPassword.toString("hex"),NewsLetter,Salt.toString("hex"),(error,row)=>{
        if(error){
        }
        else{
          res.redirect("/sign-in");
      }
    });
  })
})

export default router;