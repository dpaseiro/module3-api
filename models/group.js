const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const groupSchema = new Schema ({
    name: {
        type: String, required: true
    },
    author: {
        type: Schema.Types.ObjectId
    },
    avatar: String,
    members: [{type: Schema.Types.ObjectId}],
    description: String,
    comments: [{type: Schema.Types.ObjectId}],
    
    gameTitle: {
        type: String, 
        enum: [
            "Pota",
            "200% Snake",
            "Kitty Klicker",
            "Space Dogfight",
            "George vs. Arepa",
            "TactClicks",
            "SAGEOM",
            "KanyeSnake",
            "MazeOrc",
            "Rhythm & Time",
            "Humans vs. Orcs",
            "Country Cow",
            "Alien Invasion",
            "Ping Pong",
            "Star Wars Doodle Jump",
            "Secure the Henny"
        ],
    required: true
    }
},
{
    timestamps:true
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;