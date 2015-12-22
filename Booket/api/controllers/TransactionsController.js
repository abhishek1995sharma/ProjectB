/**
 * TransactionsController
 *
 * @description :: Server-side logic for managing Transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	new:function(req,res)
 	{
 		res.view({});
 	},

 	create:function(req, res, next)
 	{
 		params = req.params.all();

 		if(params.catalog){
 			Catalog.findOne({id : params.catalog}).exec(function(err, catalog){
 				if (err)
 				{
	 				console.log("Catalog not found!");
	 				console.log(err);
	                return res.json(500, 'Sever error'); //not found
	            }else
	            {
	            	params.catalog = catalog;
	            	if(params.type == "buy" || params.type == "addToCatalog"){
	            		catalog.quantity+=params.quantity;
	            	}

	            	if(params.type == "sell"){
	            		catalog.quantity-=params.quantity;
	            	}
	            	
	            	Catalog.update(params.id, catalog, function catalogItemUpdated (err)
					{
						if(err)
						{
							console.log(err);

							req.session.flash ={
								err: err
							}
		 				}else{
				 			req.session.flash={};
				 		}
			 		});

			 		Transactions.create(params, function transactionCreated (err, transaction)
			 		{
			 			if(err)
			 			{
			 				console.log("Transaction creation error!");
			 				console.log(err);

			 				req.session.flash = {
			 					err: err
			 				}

			 				res.redirect('transactions/new');
			 			}else{
		 					if(req.param('key')){
		 						res.json(transaction.toJSON());
		 					}else{
		 						res.redirect('transactions/index');
		 					}
			 			}
			 		});
	            }
 			})
 		}else{
	 		console.log("Param not found!");
 		}
 	},

 	show: function(req, res, next)
 	{
 		Transactions.findOne(req.param('id'), function foundTransaction (err, transaction)
 		{
 			if(err) return next(err);
 			if(!transaction) return next('Transaction doesn\'t exist');
 			res.view({
 				transaction: transaction
 			});
 		});
 	},

 	edit: function(req, res, next)
 	{
 		params = req.params.all();

 		Transactions.findOne(params.id, function foundTransaction (err, transaction)
 		{
 			if(err) return next(err);
 			if(!transaction) return next('Transaction doesn\'t exist');
 			res.view({
 				transaction: transaction
 			});
 		});
 	},

 	update:function(req, res, next)
 	{
 		params = req.params.all();
 		
 		if(params.catalog){
 			Catalog.findOne({id : params.catalog}).exec(function(err, catalog){
 				if (err)
 				{
	 				console.log("Catalog not found!");
	 				console.log(err);
	                return res.json(500, 'Sever error'); //not found
	            }else
	            {
	            	params.catalog = catalog;

			 		Transactions.update(params.id, params, function transactionUpdated (err)
			 		{
			 			if(err)
			 			{
			 				console.log(err);

			 				req.session.flash ={
			 					err: err
			 				}

			 				res.redirect('transactions/edit/'+transaction.id);
			 			}else{
				 			req.session.flash={};
		 					if(req.param('key')){
		 						res.json(transaction.toJSON());
		 					}else{
				 				res.redirect('transactions/show/'+req.param('id'));
		 					}
				 		}
			 		});

			 	}
			})
		}
 	},

 	destroy: function(req, res, next)
 	{
 		Transactions.findOne(req.param('id'), function foundTransaction (err, transaction)
 		{
 			if(err) return next(err);
 			if(!transaction) return next('Transaction doesn\'t exist');
 			Transactions.destroy(req.param('id'), function transactionDestroy (err)
 			{
 				if(err) return next(err);
 			});
 		})
 		res.redirect('/transactions');
 	},

 	index: function(req, res, next)
 	{
 		Transactions.find(function foundTransactions (err, transactions)
 		{
 			if(err) return next(err);
 			res.view({
 				transactions: transactions
 			});
 		});
 	}
};