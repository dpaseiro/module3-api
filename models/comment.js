const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema ({
    author: {
        type: Schema.Types.ObjectId
    },
    comment: String,
    commentFor: {
        type: Schema.Types.ObjectId
    }
},
{
    timestamps:true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;