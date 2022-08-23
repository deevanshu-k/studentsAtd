const { Router } = require('express');
const studentController = require('../controllers/student.controller');
const {checkteacherauth} = require('../middleware/teacher.middleware');
const {checkstudentauth} = require('../middleware/student.middleware');

const router = Router();

router.post('/login', studentController.login);
router.post('/create', checkteacherauth ,studentController.create);
router.post('/addatd', checkteacherauth ,studentController.addAttendence);
router.get('/attendences',checkstudentauth,studentController.getstudentwithattendence);
router.get('/atdbyeno',checkteacherauth,studentController.getstudentwithattendence);
router.get('/atdbyclass',checkteacherauth,studentController.getAtdByClass);
router.get('/scodebyeno',checkstudentauth,studentController.getSubCode);

module.exports = router;