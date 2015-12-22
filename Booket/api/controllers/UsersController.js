/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

 	new:function(req,res)
 	{
 		res.view({});
 	},

 	create:function(req, res, next)
 	{
 		Users.create(req.params.all(), function userCreated (err, user)
 		{
 			if(err)
 			{
 				console.log(err);

 				req.session.flash ={
 					err: err
 				}

 				res.redirect('users/new');
 			}else{

 				// var oldDate = new Date();
 				// var newDate = new Date(oldDate.getTime()+1000*60*60*24*30);
 				// req.session.cookie.expires = newDate;
	 			// req.session.authenticated = true;
	 			// req.session.user = user;

	 			// req.session.flash={};
	 			// res.redirect('users/show/'+user.id);

 				res.redirect('users/index');
 			}
 		});
 	},

 	show: function(req, res, next)
 	{
 		Users.findOne(req.param('id'), function foundUser (err, user)
 		{
 			if(err) return next(err);
 			if(!user) return next('User doesn\'t exist');
 			res.view({
 				user: user
 			});
 		});
 	},

 	edit: function(req, res, next)
 	{
 		Users.findOne(req.param('id'), function foundUser (err, user)
 		{
 			if(err) return next(err);
 			if(!user) return next('User doesn\'t exist');
 			res.view({
 				user: user
 			});
 		});
 	},

 	update:function(req, res, next)
 	{
 		console.log(req.params.all());
 		var obj = req.params.all();
 		if(req.param('makeAdmin')=='on'){
 			obj.admin=true;
 		}
 		Users.update(req.param('id'), obj, function userUpdated (err)
 		{
 			if(err)
 			{
 				console.log(err);

 				req.session.flash ={
 					err: err
 				}

 				res.redirect('users/edit/'+req.param('id'));
 			}

 			req.session.flash={};
 			res.redirect('users/show/'+req.param('id'));
 		});
 	},

 	destroy: function(req, res, next)
 	{
 		Users.findOne(req.param('id'), function foundUser (err, user)
 		{
 			if(err) return next(err);
 			if(!user) return next('User doesn\'t exist');
 			Users.destroy(req.param('id'), function userDestroy (err)
 			{
 				if(err) return next(err);
 			});
 		})
 		res.redirect('/users');
 	},

 	block: function(req, res, next)
 	{
 		var obj = {'blocked':true};
 		Users.findOne(req.param('id'), function foundUser (err, user)
 		{
 			if(err) return next(err);
 			if(!user) return next('User doesn\'t exist');
	 		Users.update(req.param('id'), obj, function userUpdated (err)
	 		{
	 			if(err)
	 			{
	 				console.log(err);
	 				next(err);
	 			}
	 		});
 		})
 		res.redirect('/users');
 	},

 	unblock: function(req, res, next)
 	{
 		var obj = {'blocked':false};
 		Users.findOne(req.param('id'), function foundUser (err, user)
 		{
 			if(err) return next(err);
 			if(!user) return next('User doesn\'t exist');
	 		Users.update(req.param('id'), obj, function userUpdated (err)
	 		{
	 			if(err)
	 			{
	 				console.log(err);
	 				next(err);
	 			}
	 		});
 		})
 		res.redirect('/users');
 	},

 	index: function(req, res, next)
 	{
 		var blockedFirst = Users.find();
		blockedFirst.sort('blocked DESC');

		blockedFirst.exec(function callBack(err,users){
 			if(err) return next(err);
 			res.view({
 				users: users
 			});
    	});
 	}
	
};

