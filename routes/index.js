const { Router } = require('express');
const studentRoute = require('./student.route');
const router = Router();

router.use('/student', studentRoute);


module.exports = router;