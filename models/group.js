const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const groupSchema = new Schema ({
    name: String,
    author: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    avatar: String,
    location: String,
    members: [{type: Schema.Types.ObjectId}],
    description: String,
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    
    gameTitle: {
        type: String, 
    required: true
    }
},
{
    timestamps:true
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;