//Creating a basic instance of express, strictly using JSON and no node/express templating engine. 

const express = require("express")
//morgan is a logger, it pulls in requests automatically. Anytime you log into the server or fire it up, it will log what route we hit. Good for debugging. If you deploy this, it will tell you who's IP was looking at your server
const morgan = require("morgan"); 
//Within the Network on Inspect, within the Headers when you get a localhost error, you can see what routing system you use (i.e Express), Helmet encrypts this and helps with hackers. 
const helmet = require("helmet")
// cross-origin-resource-sharing header. Sets that to * meaning any origin can request from our backend. For ours, it includes localhost:3000 b/c that is what React runs on. With cors, we are able to say 'hey if you see this localhost:3000 pop up on the frontend then you can communicate with our backend' 
const cors = require("cors");
//Requiring Mongoose so we can set up connection
const mongoose = require("mongoose");
//requiring dotenv so that it will automatically read that file and use the values in .env within index.js
require('dotenv').config();

//importing middleware consts
const { notFound, errorHandler } = require("./middlewares");

//importing api routes which will also act as a middleware
const routes = require('./api/logs')

const app = express();

//Creating Mongoose connection. You can set up the mongoose library works is we can create a connection here or elsewhere and because we registered the logEntry model we will be good to go. WE shoould use enviornment variables here. Such as process.env
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/travel-log", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
});

const PORT = process.env.PORT || 8080

//Needed for Production on Heroku to read env variables and make a build. 
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Middlewares running through Express Instance... 
app.use(morgan('combined'));
app.use(helmet());
app.use(cors({
    origin: process.env.PORT || 'http://localhost:8080',
}));
//Using only json for the api so we can use express' bodyParser middleware
app.use(express.json());

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.get( "/", (req, res) => {
    res.json({
        message:"Hello World!",
    });
});

app.use('/api/logs', routes);




//Error Catching Middleware, has to go at bottom
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SERVER IS FIRED UP AT http://localhost:${PORT}`)
})