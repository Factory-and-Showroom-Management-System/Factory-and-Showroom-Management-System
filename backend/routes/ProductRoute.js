const exports = require('express');
const FinishProductController = require('../controllers/finishProduct.controller');

const router = express.Router();

router.get('/showProduct', FinishProductController.showProduct);
