const express = require('express');
const biodataController = require('../controllers/biodata.controller');

const router = express.Router();

router.post('/adddata', biodataController.BioDataSave);
router.get('/showdata', biodataController.BioDataShow);
router.get('/showdata/:userId', biodataController.biodataShowId); 
router.put('/updatedata/:userId', biodataController.BioDataUpdate);
router.delete('/destroydata/:userId', biodataController.BioDataDelete);

module.exports = router;
