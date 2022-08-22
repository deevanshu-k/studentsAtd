const teachercontroller = require('../controllers/teacher.controller');
const { Router } = require('express');
const router = Router();

router.post('/login', teachercontroller.login);



module.exports = router;