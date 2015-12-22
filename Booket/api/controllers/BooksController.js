/**
 * BooksController
 *
 * @description :: Server-side logic for managing Books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req,res)
 	{
 		res.view({});
 	},

 	create:function(req, res, next)
 	{
 		Books.create(req.params.all(), function bookCreated (err, book)
 		{
 			if(err)
 			{
 				console.log("Book creation error!");
 				console.log(err);

 				req.session.flash ={
 					err: err
 				}

 				res.redirect('books/new');
 			}else{

 				res.redirect('books/index');
 			}
 		});
 	},

 	show: function(req, res, next)
 	{
 		Books.findOne(req.param('id'), function foundBook (err, book)
 		{
 			if(err) return next(err);
 			if(!book) return next('Book doesn\'t exist');
 			res.view({
 				book: book
 			});
 		});
 	},

 	edit: function(req, res, next)
 	{
 		Books.findOne(req.param('id'), function foundBook (err, book)
 		{
 			if(err) return next(err);
 			if(!book) return next('Book doesn\'t exist');
 			res.view({
 				book: book
 			});
 		});
 	},

 	update:function(req, res, next)
 	{
 		Books.update(req.param('id'), req.params.all(), function bookUpdated (err)
 		{
 			if(err)
 			{
 				console.log(err);

 				req.session.flash ={
 					err: err
 				}

 				res.redirect('books/edit/'+book.id);
 			}else{
	 			req.session.flash={};
	 			res.redirect('books/show/'+req.param('id'));
	 		}
 		});
 	},

 	destroy: function(req, res, next)
 	{
 		Books.findOne(req.param('id'), function foundBook (err, book)
 		{
 			if(err) return next(err);
 			if(!book) return next('Book doesn\'t exist');
 			Books.destroy(req.param('id'), function bookDestroy (err)
 			{
 				if(err) return next(err);
 			});
 		})
 		res.redirect('/books');
 	},

 	index: function(req, res, next)
 	{
 		Books.find(function foundBooks (err, books)
 		{
 			if(err) return next(err);
 			res.view({
 				books: books
 			});
 		});
 	}
};

