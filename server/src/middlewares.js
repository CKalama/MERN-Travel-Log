//This Middleware was built with a very Tecnical Background, essentially, when you test for these errors and you jump to a /route that is not found, you will get a error message displaying why this is happening and where it may be in the code a little better. Super useful for debugging!!!

//With this Middleware, which requires THREE PARAMETERS, This is usually the last route you create which is the notFound route. It is a debugging error catching route, originalUrl is a good syntax to remember as well
//This middleware is creating the Not Found Error, sending the 404 status code so we know its 404, and then forwarding to actual error handler.
//Not Found Error Logic
const notFound = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl} 😈`);
    res.status(404)
    next(err)
};



//Error-Handling Middlewares require FOUR PARAMETERS . This will help us check if statusCode is 200 and that means some other route has an error and we made it to this error. It has a ternary operator
//General Error Handler for any other types of Errors
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode);
    res.json({
        message: error.message,
        //Below, we can make sure that this stack is only displayed in development not production with a ternary operatior. Learning more about the fluidity of Javascript and Node on the backend.
        stack: process.env.NODE_ENV === 'production' ? 'Stop! You Have Violated the Law! Pay the Court the fine or serve your sentence. Your IP is not forfeit...' : error.stack,
    })
};

module.exports = { notFound, errorHandler }