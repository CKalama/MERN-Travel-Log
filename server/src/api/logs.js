//Router that has multiple routes that will allow us to interact with the database. 
const { Router } = require('express')

const router = Router();

router.get('/', (req,res) => {
    res.json({
        message:"Hello This is a Test!!!!"
    })
})

//Creating post route, the handler that runs when we receive a post request from the /logs route
router.post('/', (req, res) => {
    console.log(req.body);
})












module.exports = router;