import express from "express";

const router = express.Router()

router.get('/', (req,res) => {
    res.send('Users!')
})

router.get('/specific', (req,res) => {
    res.send('Specific user')
})

module.exports = router