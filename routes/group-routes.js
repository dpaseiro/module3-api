const express       = require('express');
const groupRoutes   = express.Router();
const passport      = require('passport');
const ensureLogin   = require('connect-ensure-login');

const Group          = require('../models/group');
 
// CREATE GROUP
groupRoutes.post('/group/create', (req, res, next) => {
    const name        = req.body.name;
    const author      = req.body.username;
    const members     = [req.body._id];
    const description = req.body.description;
    const gameTitle   = req.body.gameTitle;

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
        auther: author,
        members: members,
        description: description,
        gameTitle: gameTitle
      });
     console.log('.............................', theGroup)
      theGroup.save((err) => {
        if (err) {
          res.status(400).json({ message: 'Something went wrong with the save', err });
          return;
        }
        
        res.status(201).json({message: 'success'});
        });
      });
});

// GRAB INFO FOR GROUP
groupRoutes.get('/group', (req, res, next)=>{
    Group.findById(req.params.id)
    .then((theGroup) => {
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
            res.status(500).json({ message: 'database error'});
        });
    })

    //DELETE GROUP
groupRoutes.post('/group/delete', (req, res, next)=>{
    Group.findByIdAndRemove(req.params.id)
    .then((reponse)=>{
        res.status(200).json("deleted");
    })
});

});

module.exports = groupRoutes