angular.module('app.models.categories', [

])
.service('CategoriesModel', function($http, $q){
	var model = this,
	URLS = {
		FETCH: 'data/categories.json'
	},
	categories;

	function extract(result){
		return result.data;
	}

	function cacheCategories(result){
		categories = extract(result);
		return categories;
	}

	model.getCategories = function(){
		return (categories) ? $q.when(categories) : $http.get(URLS.FETCH).then(cacheCategories);
	};
	model.getCategoryByName = function(categoryName) {
		var deferred = $q.defer();

		function findCategory() {
			return _.find(categories, function(el){ 
				return el.name == categoryName;
			});
		};

		if(categories){ 
			deffered.resolve(findCategory());
		}else { 
			model.getCategories()
				.then(function(result) {
					deferred.resolve(findCategory());
				});
		};
		return deffered.promise;
	};
});