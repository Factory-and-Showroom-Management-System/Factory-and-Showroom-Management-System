const models = require('../models');

function showProduct(req, res) {
    models.FinishProduct.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

module.exports = {
    showProduct: showProduct
}