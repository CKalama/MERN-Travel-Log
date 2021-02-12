const mongoose = require('mongoose');
const { Schema } = mongoose; 


//If we put this into an object we can validate it before it is inserted into database. And then we can put into a variable so that we can reuse it!
const requiredString = {
    type: String,
    required: true,
};
const requiredNumber = {
    type: Number,
    required: true,
};
// const defaultDate = {
//     type: Date,
//     default: Date.now
// };

const logEntrySchema = new Schema({
    title: requiredString,
    description: String,
    comments: String,
    image: String, 
    rating: {
        type: Number,
        min:[0, `C'mon don't ruin their day!`],
        max:[10, `It does look great!`],
        default:0,
    },
    latitude: requiredNumber,
    longitude: requiredNumber,
    visitDate: {
        required: true,
        type: Date
    },
    //NOT SURE why this has this extra brack within the Schema... Must have something to do with timestamps. a Built in Mongoose type that acts as a CreatedAt and UpdatedAt datatype.
}, {
    timestamps: true,
    
});

module.exports = logEntrySchema;