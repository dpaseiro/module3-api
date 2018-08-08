const express       = require('express');
const commentRoutes = express.Router();
const bcrypt        = require('bcryptjs');
const passport      = require('passport');
const ensureLogin   = require('connect-ensure-login'); 

const Comment       = require('../models/comment');
const Group         = require('../models/group');
const Event         = require('../models/event');

// GRAB INFO FOR USER
commentRoutes.get('/comment/:id', (req, res, next)=>{
    Comment.findById(req.params.id)
.then((theComment) => {
    res.status(400).json({theUser: req.user})
})
});

//CREATE COMMENT IN SPECIFIC GROUP
commentRoutes.post('/group/:id/comment', (req, res, next) => {
    const theComment = new Comment({
        comment: req.body.comment,
        group: req.params.id
    });
    theComment.save()
      .then((response) => {
        Group.findById(req.params.id)
        .then(thatGroup => {
            thatGroup.comment.push(response._id);
            thatGroup.save()
            .then(()=>{
              res.json(response);
            })
            .catch((err)=>{
              res.json(err);
            });
          })
          .catch((err)=>{
            res.json(err);
          });
        })
      .catch((err) => {
          res.json(err);
        });
      });

//DELETE COMMENT FROM GROUP
commentRoutes.delete('/group/:groupId/comment/:commentId/delete', (req, res, next)=>{
    Group.findById(req.params.groupId)
    .then(groupFromDB =>{
        groupFromDB.comments.pull(req.params.commentId)
        groupFromDB.save()
        .then(() => {
            Comment.findByIdAndRemove(req.params.commentId)
            .then((response)=>{
                if(response === null) {
                    res.status(400).json({message: "Comment not found!"})
                } else {
                    res.status(200).json("deleted");
                }
            })
            .catch(err => {
                res.status(500).json("something went wrong")
            })
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong !"})
        })
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong!"})
    })
});


//CREATE COMMENT IN SPECIFIC EVENT
commentRoutes.post('/event/:id/comment', (req, res, next) => {
    const theComment = new Comment({
        comment: req.body.comment,
        event: req.params.id
    });
    theComment.save()
      .then((response) => {
        Event.findById(req.params.id)
        .then(thatEvent => {
            thatEvent.comments.push(response._id);
            thatEvent.save()
            .then(()=>{
              res.json(response);
            })
            .catch((err)=>{
              res.json(err);
            });
          })
          .catch((err)=>{
            res.json(err);
          });
        })
      .catch((err) => {
          res.json(err);
        });
      });

//DELETE COMMENT FROM EVENT
commentRoutes.delete('/event/:eventId/comment/:commentId/delete', (req, res, next)=>{
    Event.findById(req.params.eventId)
    .then(eventFromDB =>{
        eventFromDB.comments.pull(req.params.commentId)
        eventFromDB.save()
        .then(() => {
            Comment.findByIdAndRemove(req.params.commentId)
            .then((response)=>{
                if(response === null) {
                    res.status(400).json({message: "Comment not found!"})
                } else {
                    res.status(200).json("deleted");
                }
            })
            .catch(err => {
                res.status(500).json("something went wrong")
            })
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong !"})
        })
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong!"})
    })
});

module.exports = commentRoutes