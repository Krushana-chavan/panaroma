const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');
const counterIncrementor = require('../../utils/counterIncrementer');

const cryptoCurrencySchema = mongoose.Schema(
	{
		uuid: {
			type: String,
			trim: true,
			required: true,
		},
		symbol: {
			type: String,
			trim: true,
			required: true,
		},
		name: {
			type: String,
			trim: true,
	
		},
		color: {
			type: String,
			trim: true,
		
		},
		iconUrl: {
			type: String,
			trim: true,
	
		},
		marketCap: {
			type: String,
			trim: true,
		
		},
		price: {
			type: Number,
			
		},
		listedAt: {
			type: Number,
			
		},
		tier: {
			type: Number,
		
		},
		change: {
			type: String,
			trim: true,
			
		},
		rank: {
			type: Number,
			
		},
		sparkline: {
			type: [String],
			default: [],
		},
		lowVolume: {
			type: Boolean,
			default: false,
		},
		coinrankingUrl: {
			type: String,
			trim: true,
			
		},
		'24hVolume': {
			type: String,
			trim: true,
		 
		},
		btcPrice: {
			type: String,
			trim: true,
			
		},
		active:{
			type: Boolean,
			default:true
		},
		contractAddresses: {
			type: [String],
			default: [],
		}
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
cryptoCurrencySchema.plugin(toJSON);
cryptoCurrencySchema.plugin(paginate);

const CryptoCurrency = mongoose.model('currency', cryptoCurrencySchema);

module.exports = CryptoCurrency;
