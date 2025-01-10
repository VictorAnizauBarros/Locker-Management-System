const express = require('express'); 
const router = express.Router(); 
const lockersController = require('../controllers/lockersControllers')

router.get('/lockers', lockersController.getLockers); 
router.post('/rent-locker', lockersController.postLockers); 


module.exports = router;