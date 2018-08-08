const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema ({
    name: {
        type: String, required: true
    },
    author: {
        type: Schema.Types.ObjectId
    },
    avatar: String,
    description: String,
    location: [{
        address: String,
        city: String,
        state: String,
        zip: Number
        // ,
        // required: true
    }

    ],
    rsvp: [
        "Yes", "No", "Maybe"
    ],
    comments: [{type: Schema.Types.ObjectId}],
    date: {
        type: String, required:true
    },
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
    required:true
    }
},
    {
    timestamps:true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;