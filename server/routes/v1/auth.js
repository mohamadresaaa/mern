const router = require('express').Router();

router.post('/register' , (req , res) => {
    res.json('resgister page');
});

router.post('/login' , (req , res) => {
    res.json('login page');
});


module.exports = router;