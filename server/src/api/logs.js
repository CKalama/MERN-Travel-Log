//Router that has multiple routes that will allow us to interact with the database. 
const { Router } = require('express')

const router = Router();

router.get('/', (req,res) => {
    res.json({
        message:"Hello This is a Test!!!!"
    })
})












module.exports = router;