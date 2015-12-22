/**
* Catalog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: 
	{
		user: 
		{
			model:'Users'
		},

		book: 
		{
			model:'Books'
		},

		quantity: 
		{
			type:'integer'
		},

		sellingPrice: 
		{
			type:'float'
		},

		costPrice: 
		{
			type:'float'
		},

		synced:
		{
			type:'boolean',
			defaultsTo:true
		},

		transactions:
		{
			collection: 'Transactions',
			via: 'catalog'
		},

		toJSON: function()
		{
			var obj=this.toObject();
			delete obj._csrf;
			return obj;
		}
	},
};

