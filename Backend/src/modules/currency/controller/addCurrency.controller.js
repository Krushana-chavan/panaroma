const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const pick = require('../../../utils/pick');
const { sendResponse } = require("../../../utils/responseHandler");
const currencyService = require("../services");
const addProduct = catchAsync(async (req, res) => {
    const {
        tier,
        change,
        name,
        color,
        btcPrice,
        rank,
        symbol,
        iconUrl,
        price
    } = await pick(req.body,
        [
            "tier",
            "change",
            "name",
            "btcPrice",
            "iconUrl",
            "rank",
            "color",
            "symbol",
            "price"]);

            console.log( tier,
                change,
                name,
                btcPrice,
                rank,
                color,
                symbol,
                iconUrl,
                price)
    const insertResult = await currencyService.transferData({
        tier,
        change,
        name,
        btcPrice,
        rank,
        color,
        symbol,
        iconUrl,
        price
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