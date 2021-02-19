//Router that has multiple routes that will allow us to interact with the database. 
const { Router } = require('express')

const LogEntry = require("../models/LogEntry");
//grabbing body parser npm 
//const bodyParser = require('body-parser');

const router = Router();
// const jsonParser = bodyParser.json();
// const urlencoderParser = bodyParser.urlencoded({extended: false });

router.get('/', (req,res) => {
    res.json({
        message:"Hello This is a Test!!!!"
    })
})

//Creating post route, the handler that runs when we receive a post request from the /logs route
        //jsonParser needs to be inbetween 2 parameters if you get body parser middleware back //
router.post('/', (req, res) => {
    //Going back to our LogEntry.js in the models folder, we want to create a new one with this variable
    const logEntry = new LogEntry(req.body);
    console.log(req.body);
})












module.exports = router;