/**
* Books.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: 
	{	
		ISBN10: 
		{
			type:'string'
		},

		ISBN13: 
		{
			type:'string'
		},

		title: 
		{
			type:'string'
		},

		author: 
		{
			type:'string'
		},

		publisher:
		{
			type:'string'	
		},

		desc:
		{
			type:'string'	
		},

		catalogItems:
		{
			collection: 'Catalog',
			via: 'book'
		},

		toJSON: function()
		{
			var obj=this.toObject();
			delete obj._csrf;
			return obj;
		}
	},
};

