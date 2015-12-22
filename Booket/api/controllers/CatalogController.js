/**
 * CatalogController
 *
 * @description :: Server-side logic for managing Catalogs
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

 		if(params.user){
 			Users.findOne({id : params.user}).exec(function(err, user){
 				if (err)
 				{
	 				console.log("User not found!");
	 				console.log(err);
	                return res.json(500, 'Server error'); //not found
	            }else
	            {
	            	params.user = user;
					
			 		if(params.book){
			 			Books.findOne({id : params.book}).exec(function(err, book){
			 				if (err)
			 				{
				 				console.log("Book not found!");
				 				console.log(err);
				                return res.json(500, 'Server error'); //not found
				            }else
				            {
				            	params.book = book;

						 		Catalog.create(params, function catalogItemCreated (err, catalogItem)
						 		{
						 			if(err)
						 			{
						 				console.log("CatalogItem creation error!");
						 				console.log(err);

						 				req.session.flash ={
						 					err: err
						 				}

						 				res.redirect('catalog/new');
						 			}else{
					 					if(req.param('key')){
					 						res.json(catalogItem.toJSON());
					 					}else{
						 					res.redirect('catalog/index');
					 					}
						 			}
						 		});
						 	}
			 			})
			 		}else{
		 				console.log("Param not found!");
			 		}	
			 	}
 			})
 		}else{
			console.log("Param not found!");
 		}	
 	},

 	show: function(req, res, next)
 	{
 		Catalog.findOne(req.param('id'), function foundCatalogItem (err, catalogItem)
 		{
 			if(err) return next(err);
 			if(!catalogItem) return next('CatalogItem doesn\'t exist');
 			res.view({
 				catalogItem: catalogItem
 			});
 		});
 	},

 	edit: function(req, res, next)
 	{
 		Catalog.findOne(req.param('id'), function foundCatalogItem (err, catalogItem)
 		{
 			if(err) return next(err);
 			if(!catalogItem) return next('CatalogItem doesn\'t exist');
 			res.view({
 				catalogItem: catalogItem
 			});
 		});
 	},

 	update:function(req, res, next)
 	{
 		params = req.params.all();

 		if(params.user){
 			Users.findOne({id : params.user}).exec(function(err, user){
 				if (err)
 				{
	 				console.log("User not found!");
	 				console.log(err);
	                return res.json(500, 'Server error'); //not found
	            }else
	            {
	            	params.user = user;
					
			 		if(params.book){
			 			Books.findOne({id : params.book}).exec(function(err, book){
			 				if (err)
			 				{
				 				console.log("Book not found!");
				 				console.log(err);
				                return res.json(500, 'Server error'); //not found
				            }else
				            {
				            	params.book = book;

						 		Catalog.update(params.id, params, function catalogItemUpdated (err)
						 		{
						 			if(err)
						 			{
						 				console.log(err);

						 				req.session.flash ={
						 					err: err
						 				}

						 				res.redirect('catalog/edit/'+params.id);
						 			}else{
							 			req.session.flash={};
					 					if(req.param('key')){
					 						res.json(catalogItem.toJSON());
					 					}else{
							 				res.redirect('catalog/show/'+req.param('id'));
					 					}
							 		}
						 		});
						 	}
			 			})
			 		}else{
		 				console.log("Param not found!");
			 		}	
			 	}
 			})
 		}else{
			console.log("Param not found!");
 		}	
 	},

 	destroy: function(req, res, next)
 	{
 		Catalog.findOne(req.param('id'), function foundCatalogItem (err, catalogItem)
 		{
 			if(err) return next(err);
 			if(!catalogItem) return next('CatalogItem doesn\'t exist');
 			Catalog.destroy(req.param('id'), function catalogItemDestroy (err)
 			{
 				if(err) return next(err);
 			});
 		})
 		res.redirect('/catalog');
 	},

 	index: function(req, res, next)
 	{
 		Catalog.find(function foundCatalog (err, catalog)
 		{
 			if(err) return next(err);
 			res.view({
 				catalog: catalog
 			});
 		});
 	}
};

