/**
 * RestController
 *
 * @description :: Server-side logic for managing rests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	login:function(req, res)
	{
		function showUser(err, user)
		{
			if(err) next(err);
			if(!user){
				console.log('No user exists');
				res.json(null);
			}else{
				require('bcrypt').compare(req.param('password'), user.encryptedPassword, function(err, valid){
					if(err) return next(err);
					if(valid && user.blocked==false){
						delete user.catalogItems;
						delete user.encryptedPassword;
						delete user.admin;

						obj = {'valid' : valid, 'user' : user };
					}else{
						obj = {'valid' : valid };
					}
					res.json(obj);
				})
			}
		}

		if(req.param('username')){
			Users.findOne({username:req.param('username')}).exec(showUser)
		}

		if(req.param('email')){
			Users.findOne({email:req.param('email')}).exec(showUser)
		}
	},
	
	signup:function(req, res)
	{
		Users.create(req.params.all(), function userCreated (err, user)
 		{
 			if(err)
 			{
 				console.log(err);

 				req.session.flash ={
 					err: err
 				}

 				res.json({'user':null});
 			}else{
 				res.json({'user':user});
 			}
 		});
	},

	user:function(req, res)
	{
		function showUser(err, user)
		{
			if(err) next(err);
			if(!user){
				console.log('No user exists');
				res.json(null);
			}
			else{
				res.json(user.toJSON());
			}
		}

		if(req.param('id')){
			Users.findOne({id:req.param('id')}).exec(showUser)
		}

		if(req.param('username')){
			Users.findOne({username:req.param('username')}).exec(showUser)
		}
	},

	book:function(req, res)
	{
		function showBook(err, book)
		{
			if(err) next(err);
			if(!book){
				console.log('No book exists');
				res.json(null);
			}else{
				delete book.catalogItems;
				res.json(book.toJSON());
			}
		}

		if(req.param('id')){
			Books.findOne({id:req.param('id')}).populate('catalogItems').exec(showBook)
		}
		if(req.param('name')){
			Books.findOne({name:req.param('name')}).populate('catalogItems').exec(showBook)
		}
	},

	catalog:function(req, res)
	{
		function showCatalog(err, catalog)
		{
			if(err) next(err);
			if(!catalog){
				console.log('No catalogItem exists');
				res.json(null);
			}else{
				Books.findOne({id:catalog.book}).exec(function(err, book){
					delete catalog.book;
					delete book.catalogItems;
					catalog.book = book;
	
					res.json(catalog.toJSON());
				});
			}
		}
		
		function showUserCatalog(err, user)
		{
			if(err) next(err);
			if(!user){
				console.log('No user exists');
				res.json(null);
			}
			else{
				user.catalogItems.forEach(function (element, index, array){
					Books.findOne({id:element.book}).exec(function(err, book){
						delete element.user;
						delete element.book;
						delete book.catalogItems;
						delete user.catalogItems;
						delete user.encryptedPassword;
						delete user.admin;
						element.book = book;
						element.user = user;

						if(index == array.length-1) res.json(user.toJSON().catalogItems);
					});
				});
			}
		}

		if(req.param('id')){
			Catalog.findOne({id:req.param('id')}).populate('transactions').exec(showCatalog)
		}

		if(req.param('userId')){
			if(req.param('book')){
				Catalog.findOne({user:req.param('userId'), book:req.param('book')}).exec(showCatalog);
			}else{
				Users.findOne({id:req.param('userId')}).populate('catalogItems').exec(showUserCatalog);
			}
		}

		if(req.param('username')){
			Users.findOne({username:req.param('username')}).populate('catalogItems').exec(showUserCatalog);
		}


	},

	transaction:function(req, res)
	{
		function showTransaction(err, transaction)
		{
			if(err) next(err);
			if(!transaction){
				console.log('No transaction exists');
				res.json(null);
			}else{
				res.json(transaction.toJSON());
			}
		}

		if(req.param('id')){
			Transactions.findOne({id:req.param('id')}).exec(showTransaction)
		}
	},

	addCatalogItem:function(req, res)
	{
		sails.controllers.catalog.create(req, res);
	},

	updateCatalogItem:function(req, res)
	{
		sails.controllers.catalog.update(req, res);
	},	

	addTransaction:function(req, res)
	{
		sails.controllers.transactions.create(req, res);
	},

	updateTransaction:function(req, res)
	{
		sails.controllers.transactions.update(req, res);
	},

	isbn:function(req, res)
	{
		var type = req.param('type');
		var isbn = req.param('isbn');
		var validIsbn = false;
		var findObj;
		if(isbn.length == 10){
			validIsbn = true;
			findObj = {ISBN10: isbn};
		}else if(isbn.length == 13){
			validIsbn = true;
			findObj = {ISBN13: isbn};
		}

		if(!validIsbn){
			console.log('Invalid ISBN');
			res.json(null);
		}else{
			if(type == 'book'){
				Books.findOne(findObj).exec(function (err, book)
				{
					if(err) next(err);
					if(!book){
						console.log('No book exists');
						console.log(sails.controllers);
						sails.controllers.isbn.addBook(req, res);
					}else{
						delete book.catalogItems;
						res.json(book.toJSON());					
					}
				});
			}else if(type == 'catalog'){
				Books.findOne(findObj).exec(function (err, book)
				{
					if(err) next(err);
					if(!book){
						console.log('No book exists');
						res.json(null);
					}else{
						delete book.catalogItems;

						Catalog.findOne({user:req.param('user'), book:book.id}).exec(function (err, catalog)
						{
							if(err) next(err);
							if(!catalog){
								console.log('No catalogItem exists');
								res.json(null);
							}else{
								Books.findOne({id:catalog.book}).exec(function(err, book){
									delete catalog.book;
									delete book.catalogItems;
									catalog.book = book;
					
									res.json(catalog.toJSON());
								});
							}
						});
					}
				});
			}
		}
	},
};

