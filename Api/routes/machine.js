const express = require('express');
const machineController = require('../controllers/machine.controller');

const router = express.Router();


router.post('/save', machineController.machinesave);

router.get('/view', machineController.machineview);

router.get('/view/:tableId', machineController.machineviewone);

router.put('/update/:tableId', machineController.machineupdate);

router.delete('/delete/:tableId', machineController.machinedelete);


module.exports = router;