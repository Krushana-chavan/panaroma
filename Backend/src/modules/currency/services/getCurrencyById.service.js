const mongoose = require('mongoose');
const CurrencyModel = require('../currency.model');

const getCurrencyById = async (id) => {
    try {
        let filterQuery = { active: true, _id: new mongoose.Types.ObjectId(id) }
        const currency = await CurrencyModel.findOne(filterQuery)
        if (!currency) {
            return { data: "Not Found", status: false, code: 400 };
        }
        if (currency) {
            return { data: currency, status: true, code: 200 };
        } else {
            return { data: "Not Found", status: false, code: 400 };
        }
        
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getCurrencyById;
