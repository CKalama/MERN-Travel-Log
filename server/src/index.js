//Creating an instance of express
const express = require("express")
//morgan is a logger, it pulls in requests automatically. Anytime you log into the server or fire it up, it will log what route we hit. Good for debugging. If you deploy this, it will tell you who's IP was looking at your server
const morgan = require("morgan"); 
//Within the Network on Inspect, within the Headers when you get a localhost error, you can see what routing system you use (i.e Express), Helmet encrypts this and helps with hackers. 
const helmet = require("helmet")
// cross-origin-resource-sharing header. Sets that to * meaning any origin can request from our backend. For ours, it includes localhost:3000 b/c that is what React runs on. With cors, we are able to say 'hey if you see this localhost:3000 pop up on the frontend then you can communicate with our backend' 
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 1337
//Middlewares running through Express Instance... 
app.use(morgan('combined'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
}));


app.get( "/", (req, res) => {
    res.json({
        message:"Hello World!",
    });
});

//This Middleware was built with a very Tecnical Background, essentially, when you test for these errors and you jump to a /route that is not found, you will get a error message displaying why this is happening and where it may be in the code a little better. Super useful for debugging!!!

//With this Middleware, which requires THREE PARAMETERS, This is usually the last route you create which is the notFound route. It is a debugging error catching route, originalUrl is a good syntax to remember as well
//This middleware is creating the Not Found Error, sending the 404 status code so we know its 404, and then forwarding to actual error handler.
app.use((req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404)
    next(err)
});

//Error-Handling Middlewares require FOUR PARAMETERS . This will help us check if statusCode is 200 and that means some other route has an error and we made it to this error. It has a ternary operator
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: error.stack,
    })
})



app.listen(PORT, () => {
    console.log(`SERVER IS FIRED UP AT http://localhost:${PORT}`)
})