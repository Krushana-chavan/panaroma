const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const pick = require('../../../utils/pick');
const { sendResponse } = require("../../../utils/responseHandler");
const productsServices = require("../services");
const addProduct = catchAsync(async (req, res) => {
    const {
        tier,
        change,
        name,
        btcPrice,
        productImageUrl,
       
        discountPercentage,
        brand
    } = await pick(req.body,
        [
            "handleId",
            "fieldType",
            "name",
            "description",
            "productImageUrl",
            "visible",
            "price",
            
            "brand"]);
    const insertResult = await productsServices.addProduct({
        handleId,
        fieldType,
        name,
        description,
        productImageUrl,
       
        originalPrice,
        discountPercentage,
        brand,
    });
    if (insertResult.status) {
        sendResponse(res, httpStatus.OK, insertResult.data, null);
    } else {
        if (insertResult.code == 400) {
            sendResponse(res, httpStatus.BAD_REQUEST, null, insertResult.data);
        }
        else if (insertResult.code == 500) {
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, insertResult.data);
        }
        else {
            sendResponse(res, httpStatus.BAD_REQUEST, null, insertResult.data);
        }
    }
});

module.exports = addProduct;