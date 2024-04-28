
const currencyModel = require('../currency.model');


/**
 * Create a Series
 * @param {Object} collectionData
 * @returns {Promise<Series>}
 */
const addCurrency = async (productData) => {

    try {
        const addResult = await currencyModel.create({ ...productData });
        if (addResult) {
            return { data: addResult, status: true, code: 200 };
        }
        else {
            return { data: "Can not add product", status: false, code: 400 };
        }


    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = addCurrency
