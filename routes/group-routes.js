const express       = require('express');
const groupRoutes   = express.Router();
const passport      = require('passport');
const ensureLogin   = require('connect-ensure-login');

const Group          = require('../models/group');
 
// SEARCH
groupRoutes.post('/group/search', (req, res, next) =>{
    const searchTerm = req.body.search;

    Group.findOne({name: searchTerm})
    .then((group) => {
        console.log(group)
        res.status(200).json(group)
});

});


// CREATE GROUP
groupRoutes.post('/group/create', (req, res, next) => {
    const name        = req.body.name;
    const author      = req.user._id;
    // const members     = [req.body._id];
    const description = req.body.description;
    const gameTitle   = req.body.gameTitle;
    const avatar      = req.body.avatar;
    const location    = req.body.location;


    if (!name) {
      res.status(400).json({ message: 'name this group' });
      return;
    }
  
    Group.findOne({ name }, '_id', (err, foundGroupName) => {
      if (foundGroupName) {
        res.status(400).json({ message: 'That group already exists' });
        return;
      }

      const theGroup = new Group({
        name: name,
        author: author,
        // members: members,
        description: description,
        gameTitle: gameTitle,
        location: location,
        avatar: avatar,

    });
     console.log('.............................', theGroup)
      theGroup.save((err) => {
        if (err) {
            console.log("error saving =============== ", err)
          res.status(400).json({ message: 'Something went wrong with the save', err });
          return;
        }
        
        res.status(201).json(theGroup);
        });
      });
});

// GRAB INFO FOR GROUP
groupRoutes.get('/group/:id', (req, res, next)=>{
    Group.findById(req.params.id)
    .populate('author', 'username')
    .populate('comments')
    .populate({path:'comments', populate: {path: 'author', model:'User'}})
    .then((theGroup) => {
        console.log('after populate: ', theGroup)
        res.status(200).json(theGroup)
    })
});
        
// GROUP EDIT
groupRoutes.post('/group/update', (req, res, next)=>{

    Group.findById(req.params.id)
    .then((theGroup)=>{                                                                                     

        theGroup.name = req.body.name;
        theGroup.author = req.body.author;
        theGroup.members = req.body.members;
        theGroup.description = req.body.description;
        theGroup.comments = req.body.comments;
        theGroup.gameTitle = req.body.gameTitle;
        theGroup.avatar = req.body.avatar;
       
        // if(req.file){
        //     theUser.avatar = req.file.url;
        // }

        theGroup.save()
        .then((response)=>{
            console.log("the group line ::::::::::::::::::::::::::::: ", response)
            res.status(200).json({ response });
        })
        .catch((err)=>{
            console.log("update did not work ++++++++++++++++++++++++++++++")
            res.status(500).json(theGroup);
        });
    })
});

    //DELETE GROUP
    groupRoutes.post('/group/:id/delete', (req, res, next)=>{
        Group.findByIdAndRemove(req.params.id)
        .then((reponse)=>{
            res.status(200).json({message: "deleted"});
        })
    });

module.exports = groupRoutes