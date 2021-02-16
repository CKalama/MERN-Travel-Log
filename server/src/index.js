//Creating a basic instance of express, strictly using JSON and no node/express templating engine. 

const express = require("express")
//morgan is a logger, it pulls in requests automatically. Anytime you log into the server or fire it up, it will log what route we hit. Good for debugging. If you deploy this, it will tell you who's IP was looking at your server
const morgan = require("morgan"); 
//Within the Network on Inspect, within the Headers when you get a localhost error, you can see what routing system you use (i.e Express), Helmet encrypts this and helps with hackers. 
const helmet = require("helmet")
// cross-origin-resource-sharing header. Sets that to * meaning any origin can request from our backend. For ours, it includes localhost:3000 b/c that is what React runs on. With cors, we are able to say 'hey if you see this localhost:3000 pop up on the frontend then you can communicate with our backend' 
const cors = require("cors");

const mongoose = require("mongoose");

//importing middleware consts
const { notFound, errorHandler } = require("./middlewares");

const app = express();

//Creating Mongoose connection. You can set up the mongoose library works is we can create a connection here or elsewhere and because we registered the logEntry model we will be good to go. WE shoould use enviornment variables here. Such as process.env
mongoose.connect(process.env.TRAVEL_LOG_DATABASE_URL, {
    useNewUrlParser: true 
});

const PORT = process.env.PORT || 1337

//Middlewares running through Express Instance... 
app.use(morgan('combined'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));


app.get( "/", (req, res) => {
    res.json({
        message:"Hello World!",
    });
});





//Error Catching Middleware, has to go at bottom
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SERVER IS FIRED UP AT http://localhost:${PORT}`)
})