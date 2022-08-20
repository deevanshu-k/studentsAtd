const { Router } = require('express');
const studentController = require('../controllers/student.controller')
const router = Router();

router.post('/login', studentController.login);
router.post('/', studentController.create);
router.get('/', studentController.get_byeno);


module.exports = router;