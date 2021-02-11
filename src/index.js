
//Creating an instance of express
const express = require("express")

const app = express();

const PORT = process.env.PORT || 1337

app.listen(PORT, () => {
    console.log("SERVER IS FIRED UP AT ", PORT)
})