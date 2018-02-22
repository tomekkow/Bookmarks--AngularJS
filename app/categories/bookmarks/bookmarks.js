angular.module('categories.bookmarks', [
	'categories.bookmarks.create',
	'categories.bookmarks.edit',
	'app.models.categories',
	'app.models.bookmarks'
])
.config(function($stateProvider){
	$stateProvider
	.state('app.categories.bookmarks', {
		url:'categories/:category',
		views: {
			'bookmarks@': {
				templateUrl:'app/categories/bookmarks/bookmarks.tmpl.html',
				controller: 'BookmarksListCtrl as bookmarksListCtrl'
			}
		}
	});
})
.controller('BookmarksListCtrl', function($stateParams, BookmarksModel){
	var bookmarksListCtrl = this;
	bookmarksListCtrl.currentCategoryName = $stateParams.category;

	BookmarksModel.getBookmarks()
		.then(function(result){
			bookmarksListCtrl.bookmarks = result;
		});
});