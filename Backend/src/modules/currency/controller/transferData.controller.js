const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const service  = require('./../services')
const { sendResponse } = require("../../../utils/responseHandler");
const fetch = require('node-fetch');

const transferData = catchAsync(async (req, res) => {
    // Define the API endpoint
    const url = "https://api.coinranking.com/v2/coins";

    try {
        // Make a GET request to the API endpoint
        const response = await fetch(url);

        // Check if the response is ok (status code 200)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Parse the JSON data from the response
        const data = await response.json();
        let data1 = (data?.data?.coins)
        console.log(data1.length)
        for(let i = 0 ; i<data1.length;i++){
            await service.transferData(data1[i])
        }
        // Send the response with the fetched data
        sendResponse(res, httpStatus.OK, data, null);
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error("Fetch error:", error);
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, error.message);
    }
});

module.exports = transferData;
