const { Router } = require('express');
const studentRoute = require('./student.route');
const teacherRoute = require('./teacher.route');
const router = Router();

router.use('/student', studentRoute);
router.use('/teacher', teacherRoute);


module.exports = router;