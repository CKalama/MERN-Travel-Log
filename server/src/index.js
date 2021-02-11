//Creating an instance of express
const express = require("express")
//morgan is a logger, it pulls in requests automatically. Anytime you log into the server or fire it up, it will log what route we hit. Good for debugging. If you deploy this, it will tell you who's IP was looking at your server
const morgan = require("morgan"); 
//Within the Network on Inspect, within the Headers when you get a localhost error, you can see what routing system you use (i.e Express), Helmet encrypts this and helps with hackers. 
const helmet = require("helmet")

const app = express();
app.use(morgan('common'));
app.use(helmet());


const PORT = process.env.PORT || 1337

app.listen(PORT, () => {
    console.log(`SERVER IS FIRED UP AT http://localhost:${PORT}`)
})