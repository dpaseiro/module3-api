const express       = require('express');
const eventRoutes   = express.Router();
const passport      = require('passport');
const ensureLogin   = require('connect-ensure-login');

const Event          = require('../models/event');
 
// CREATE EVENT
eventRoutes.post('/event/create', (req, res, next) => {
    const name       = req.body.name;
    const author     = req.body.author;
    const location   = req.body.location;
    const rsvp       = req.body.rsvp;
    const comments   = req.body.comments;

    if (!name) {
      res.status(400).json({ message: 'name this event' });
      return;
    }
  
    Event.findOne({ name }, '_id', (err, foundEventName) => {
      if (foundEventName) {
        res.status(400).json({ message: 'That event already exists' });
        return;
      }

      const theEvent = new Event({
        name: name,
        author: author,
        location: location,
        rsvp: rsvp,
        comments: comments
      });
     
      theEvent.save((err) => {
        if (err) {
          res.status(400).json({ message: 'Something went wrong with the save', err });
          return;
        }
        res.status(201).json({message: 'success'});
        });
      });
});

// GRAB INFO FOR EVENT
eventRoutes.get('/event/:id', (req, res, next)=>{
    Event.findById(req.params.id)
    .then((theEvent) => {
        res.status(400).json({theEvent: req.event})
    })
});
        
// EVENT EDIT
eventRoutes.post('/event/:id/update', (req, res, next)=>{

    Event.findById(req.params.id)
    .then((theEvent)=>{

        theEvent.name        = req.body.name;
        theEvent.author      = req.body.author;
        theEvent.location    = req.body.location;
        theEvent.description = req.body.rsvp;
        theEvent.comments    = req.body.comments;
        theEvent.gameTitle   = req.body.gameTitle;
        theEvent.date        = req.body.date;

        // if(req.file){
        //     theUser.avatar = req.file.url;
        // }

        theEvent.save()
        .then((response)=>{
            console.log("the event line ::::::::::::::::::::::::::::: ", response)
            res.status(200).json({ response });
        })
        .catch((err)=>{
            console.log("update did not work ++++++++++++++++++++++++++++++")
            res.status(500).json({ message: 'database error'});
        });
    })

//DELETE EVENT
eventRoutes.post('/event/:id/delete', (req, res, next)=>{
    Event.findByIdAndRemove(req.params.id)
    .then((reponse)=>{
        res.status(200).json("deleted");
    })
});

});

module.exports = eventRoutes