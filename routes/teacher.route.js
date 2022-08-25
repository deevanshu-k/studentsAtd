const teachercontroller = require('../controllers/teacher.controller');
const {checkteacherauth} = require('../middleware/teacher.middleware')
const { Router } = require('express');
const router = Router();

router.post('/login', teachercontroller.login);
router.get('/getstudentsbyclass',checkteacherauth,teachercontroller.getallstudentsbyclass);


module.exports = router;