var module = angular.module("ajax.database", []);

module.value("ajaxDatabaseConfig", {
	pageSize: 10
});

module.directive("ajaxDatabaseTable", ["ajaxDatabaseConfig", function(ajaxDatabaseConfig) {
	return {
		restrict: "E",
		require: "?ngModel",
		template: "<span class=\"angular-database-table-control\"><button ng-click=\"\">New</button></span>" + 
					"<span class=\"angular-database-table-pagination\">" +
					"<span>Order by </span>" + "<select><options><option value=\"name\">Name</option><option value=\"updateTime\">Time</option></options></select>" + 
					"<span>, page size </span>" +
					"<select><options><option value=\"10\">10</option><option value=\"20\">20</option><option value=\"50\">50</option></options></select>" + 
					"<button>Prev</button>" + "<input type=\"text\" maxlength=\"4\" size=\"4\">" + "<button>Next</button>" + "<button>Go</button>" +
					"</span>" +

					"<table class=\"angular-database-table\"><thead><th ng-repeat=\"(header, null) in headers\">{{header}}</th><th>Operations</th></thead>" + 
					"<tbody><tr ng-repeat=\"item in items\"><td ng-repeat=\"(header, null) in headers\">" +
					"{{item[header]}}</td><td><button>Edit</button><button>Delete</button></td></tr></tbody></table>",
		scope: {
			ngModel: "="
		},
		link: function(scope, element, attrs, ngModelCtrl) {
			scope.pagination = {
				page: 0
			};

			function getDisplayItems(list, index, count) {
				if(list === undefined) {
					return [];
				}
				var data = list.slice(index, index + count);
				var items = [];
				angular.forEach(data, function(item, index) {
					items.push(item);
				});
				return items;
			}

			function getDisplayHeaders(list) {
				if(list === undefined) {
					return {}
				}

				var headers = {};
				angular.forEach(list, function(item) {
					angular.forEach(item, function(value, key) {
						headers[key] = true;
					});
				});
				
				return headers;
			}

			scope.$watch("ngModel", function(list) {
				if(list !== undefined) {
					scope.headers = getDisplayHeaders(list);
					scope.items = getDisplayItems(list, scope.pagination.page * ajaxDatabaseConfig.pageSize,
						ajaxDatabaseConfig.pageSize);
					scope.pagination.total = (scope.items.length - 1) / ajaxDatabaseConfig.pageSize + 1;
				}
			});

			scope.$watch("options", function(config) {
				angular.extend(ajaxDatabaseConfig, config);
			});
		}
	};
}]);
