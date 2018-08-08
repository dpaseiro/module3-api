const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema ({
    name: String,
    email:{type: String, unique: true, required: true},
    username: {
        type: String, required:true
    },
    password: {
        type: String, required:true
    },
    location: String,
    groups: [{
        type: Schema.Types.ObjectId
    }],
    events: [{
        type: Schema.Types.ObjectId
    }],
    avatar: String,
    bio: String,
    comments: [{
        type: Schema.Types.ObjectId
    }],
    topGames: [ String ]
},
{
    timestamps:true
});

const User = mongoose.model('User', userSchema);
module.exports = User;