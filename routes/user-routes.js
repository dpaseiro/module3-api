const express    = require('express');
const userRoutes = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');

const User       = require('../models/user');

// SIGNUP
userRoutes.post('/signup', (req, res, next) => {
  console.log('body: ', req.body)
    const username = req.body.username;
    const password = req.body.password;
    const theEmail = req.body.email;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }
  
    User.findOne({ username }, '_id', (err, foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: 'The username already exists' });
        return;
      }
  
      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const theUser = new User({
        username: username,
        password: hashPass,
        email: theEmail
      });
     
      theUser.save((err) => {
        if (err) {
          res.status(400).json({ message: 'Something went wrong with the save', err });
          return;
        }
  
        req.login(theUser, (err) => {
          if (err) {
            res.status(500).json({ message: 'Something went wrong on login' });
            return;
          }
  
          res.status(200).json(req.user);
        });
        });
      });
});


// LOGIN
    userRoutes.post('/login', (req, res, next) => {
      User.findOne({username: req.body.username})
      .then(userFromDB =>{
        if(userFromDB === null) {
          res.status(400).json({message: "username is invalid"})
          return 
        }
        const userPassword = bcrypt.compareSync(req.body.password, userFromDB.password)
        if (userPassword === false) {
          res.status(400).json({message: "Password is invalid"})
          return
        }
        req.login(userFromDB, (err) => {
          userFromDB.encryptedPassword = undefined;
          res.status(200).json({
            isLoggedIn: true,
            userInfo: userFromDB
          })
        })
      })
    });

// LOGOUT
      userRoutes.post('/logout', (req, res, next) => {
        req.logout();
        res.status(200).json({ message: 'Success' });
      });


    //   LOGGED IN
      userRoutes.get('/loggedin', (req, res, next) => {
        if (req.isAuthenticated()) {
          res.status(200).json(req.user);
          return;
        }
      
        res.status(403).json({ message: 'Unauthorized' });
      });


module.exports = userRoutes;