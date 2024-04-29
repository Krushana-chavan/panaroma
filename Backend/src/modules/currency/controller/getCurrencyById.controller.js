const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const currencyService = require('../services');
const { sendResponse } = require('../../../utils/responseHandler');

const getCurrencyById = catchAsync(async (req, res) => {
  const { id } = await pick(req.params, ['id']);
  console.log(id)
  const result = await currencyService.getCurrencyById(id);
  if (result.status) {
    sendResponse(res, httpStatus.OK, result?.data, null);
  } else {
    if (result.code == 400) {
      sendResponse(res, httpStatus.BAD_REQUEST, null, result.data);
    }
    else if (result.code == 500) {
      sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result.data);
    }
    else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, result.data);
    }
  }

});

module.exports = getCurrencyById
