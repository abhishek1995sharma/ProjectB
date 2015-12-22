/**
* Transactions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: 
	{	
		type: 
		{
			type:'string'
		},

		price: 
		{
			type:'float'
		},

		quantity: 
		{
			type:'integer'
		},

		catalog: {
			model: 'Catalog'
		},

		toJSON: function()
		{
			var obj=this.toObject();
			delete obj._csrf;
			return obj;
		}
	},
};

