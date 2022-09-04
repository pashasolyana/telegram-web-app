const express = require('express');
const router = express.Router()
const controllers = require('../controllers/controller')

router.get('/abonent/:id',controllers.getAbonent)
router.put('/update/:counterId',controllers.updateCounter)

module.exports = router;