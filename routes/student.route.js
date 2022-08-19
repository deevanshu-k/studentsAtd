const { Router } = require('express');
const studentController = require('../controllers/student.controller')
const router = Router();

router.get('/', studentController.get);


module.exports = router;