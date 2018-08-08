const express       = require('express');
const profileRoutes = express.Router();
const bcrypt        = require('bcryptjs');
const passport      = require('passport');
const ensureLogin   = require('connect-ensure-login');

const User          = require('../models/user');

// GRAB INFO FOR USER
profileRoutes.get('/profile/:id', (req, res, next)=>{
    User.findById(req.params.id)
    .then((theUser) => {
        res.status(400).json(theUser)
    })
});
       
        // PROFILE EDIT
profileRoutes.post('/profile/update', (req, res, next)=>{
    console.log(req.body)
    User.findById(req.user.id)
    .then((theUser)=>{

        theUser.location = req.body.location;
        delete req.body.location;
        theUser.groups   = req.body.groups;
        delete req.body.groups;
        theUser.events   = req.body.events;
        delete req.body.events;
        theUser.bio      = req.body.bio;
        delete req.body.bio;
        theUser.avatar   = req.body.avatar;
        delete req.body.avatar;
        theUser.name     = req.body.name;
        delete req.body.name;

        theUser.topGames = Object.keys(req.body);

        
        // if(req.file){
        //     theUser.avatar = req.file.url;
        // }

        theUser.save()
        .then((response)=>{
            console.log("the user line ::::::::::::::::::::::::::::: ", response)
            res.status(200).json({ response });
        })
        .catch((err)=>{
            console.log("update did not work ++++++++++++++++++++++++++++++")
            res.status(500).json({ message: 'database error'});
        });

    })

});

module.exports = profileRoutes