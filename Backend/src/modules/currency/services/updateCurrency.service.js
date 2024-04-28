const mongoose = require('mongoose');
const currencyModel = require('../currency.model');

const updateOrderById = async ({id, body}) => {
	try {
		
		const filterQuery = { active: true, _id: new mongoose.Types.ObjectId(id) };
		const updateResult = await currencyModel.findOneAndUpdate(filterQuery, { ...body }, { new: true });
		if (updateResult) {
			return { data: updateResult, status: true, code: 200 }
		} else {
			return { msg: "Order Not Found", status: false, code: 400 }
		}
	} catch (error) {
		return { msg: error.message, status: false, code: 500 }
	}
};

module.exports = updateOrderById