const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const service  = require('./../services')
const { sendResponse } = require("../../../utils/responseHandler");
const fetch = require('node-fetch');

const transferData = catchAsync(async (req, res) => {
    const url = "https://api.coinranking.com/v2/coins";
    try { 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        let data1 = (data?.data?.coins)
        console.log(data1.length)
        for(let i = 0 ; i<data1.length;i++){
            await service.transferData(data1[i])
        }
        sendResponse(res, httpStatus.OK, data, null);
    } catch (error) {
        console.error("Fetch error:", error);
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, error.message);
    }
});

module.exports = transferData;
