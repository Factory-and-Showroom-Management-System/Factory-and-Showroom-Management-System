const express = require('express');
const adminMaterialController = require('../controllers/admin.material.controller');

const router = express.Router();


router.post('/save', adminMaterialController.rawmaterialSave);

router.get('/view', adminMaterialController.rawmaterialView);

router.get('/view/:tableId', adminMaterialController.rawmaterialViewOne);

router.put('/update/:tableId', adminMaterialController.rawmaterialUpdate);

router.delete('/delete/:tableId', adminMaterialController.rawmaterialDelete);



module.exports = router;