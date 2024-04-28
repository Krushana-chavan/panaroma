const CurrencyModel = require("../currency.model");

const getAllProducts = async (page, limit, filter, sort,minPrice,maxPrice) => {
	
	try {
	  const length = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
	  const start = page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
	  const skip = (start - 1) * length;
	  const filterQuery = {active:true,};
	  if (filter && filter.name !== undefined && filter.name !== "") {
		var searchRegex = new RegExp(`.*${filter.name}.*`, "i");
		filterQuery.$or = [
		  { name: { $regex: searchRegex } },
		];
	  }
  
	  let sortQuery = { _id: -1 };
  
	  if (sort != null) { sortQuery = sort;}


	  const CurrencyList = await CurrencyModel.find(filterQuery)
		.skip(skip)
		.limit(length)
		.sort(sortQuery)
		.lean();
	  const totalResults = await CurrencyModel.countDocuments(filterQuery);
  
	  const totalPages = Math.ceil(totalResults / length);
	  return {
		data: CurrencyList,
		totalPages,
		totalResults,
		page: start,
		limit: length,
		status: true,
		code: 200,
	  };
	} catch (error) {

	  return { status: false, code: 500, msg: error };
	}
  };
  

module.exports = getAllProducts