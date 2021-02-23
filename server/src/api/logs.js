//Router that has multiple routes that will allow us to interact with the database. 
const { Router } = require('express')

const LogEntry = require("../models/LogEntry");
//grabbing body parser npm 
//const bodyParser = require('body-parser');

const router = Router();
// const jsonParser = bodyParser.json();
// const urlencoderParser = bodyParser.urlencoded({extended: false });

//The async with this get route will allow us to hit it without making it coded in choronological/synchronous order. 
router.get('/', async (req,res, next) => {
    //Wrap this in a try catch so we can hit our error Middleware we made everytime! Never know what might happen. 
    try {
        //.find is mongoose and await is express Javascript. 
        const getEntry = await LogEntry.find();
        res.json(getEntry);
    }
    catch (error) {
        next(error);
    };
});

//Creating post route, the handler that runs when we receive a post request from the /logs route
        //jsonParser needs to be inbetween 2 parameters if you get body parser middleware back //

//Going to use an async parameter here how mongoose documentation wants us to (https://mongoosejs.com/docs/models.html#constructing-documents)
//Need next so that the catch (error) will grab our middleware error we created
router.post('/', async (req, res, next) => {
    //Need to wrap this in a try / catch javascript function
    try {
        //Going back to our LogEntry.js in the models folder, we want to create a new one with this variable
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } 
    catch (error) {
        //cool little console log that will tell you in console what the name of the error is.
        //console.log(error.name);
        if (error.name === 'ValidationError') {
            res.status(422);
        }
        //need the Next from the parameter above so it hits our error in middleware.js
        next(error);
    }    
});












module.exports = router;