const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const currencyService = require('../services');
const { sendResponse } = require('../../../utils/responseHandler');

const deleteCurrency = catchAsync(async (req, res) => {
  const { id } = await pick(req.params, ['id']);
  const result = await currencyService.deleteCurrency(id);
  console.log(result)
  if (result.status) {
    sendResponse(res, httpStatus.OK, "Deleted Successfully!", null);
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

module.exports = deleteCurrency
