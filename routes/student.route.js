const { Router } = require('express');
const studentController = require('../controllers/student.controller');
const {checkteacherauth} = require('../middleware/teacher.middleware');

const router = Router();

router.post('/login', studentController.login);
router.post('/', studentController.create);
// router.get('/', studentController.get_byeno);
router.get('/',checkteacherauth, studentController.getstudents);


module.exports = router;