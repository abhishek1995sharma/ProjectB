/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: 
	{	
		username: 
		{
			type:'string',
			required: true,
			unique:true
		},

		realname: 
		{
			type:'string'
		},

		email: 
		{
			type:'email',
			required:true,
			unique:true
		},

		type:
		{
			type:'string'
		},

		phone:
		{
			type:'string'
		},

		location:
		{
			type:'string'
		},

		encryptedPassword: 
		{
			type:'string'
		},

		admin:
		{
			type:'boolean',
			defaultsTo:false
		},

		synced:
		{
			type:'boolean',
			defaultsTo:true
		},

		blocked:
		{
			type:'boolean',
			defaultsTo:true
		},

		catalogItems:
		{
			collection: 'Catalog',
			via: 'user'
		},

		toJSON: function()
		{
			var obj=this.toObject();
			delete obj.encryptedPassword;
			return obj;
		}
	},

	beforeCreate: function(values, next)
	{
		if(!values.password || values.password!=values.confirmation)
		{
			next({err: ['Passwords don\'t match!']});
		}
		require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword)
		{
			if(err) return next(err);
			values.encryptedPassword = encryptedPassword;
			next();
		})
	}
};

