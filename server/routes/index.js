const router = require('express').Router();
// routes version
const version1 = require('./v1');


router.use('/v1' , version1);
module.exports = router;