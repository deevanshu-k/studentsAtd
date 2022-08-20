const teachercontroller = require('../controllers/teacher.controller');
const { Router } = require('express');
const router = Router();

router.post('/login', teachercontroller.login);
// router.post('/', studentController.create);
// router.get('/', studentController.get_byeno);


module.exports = router;