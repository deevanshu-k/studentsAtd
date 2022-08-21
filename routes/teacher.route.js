const teachercontroller = require('../controllers/teacher.controller');
const { Router } = require('express');
const router = Router();

router.post('/login', teachercontroller.login);
// router.get('/',checkteacherauth, teachercontroller.getstudents);
// router.get('/', studentController.get_byeno);


module.exports = router;