var module = angular.module("ajax.database", []);

module.value("ajaxDatabaseConfig", {});

module.directive("ajaxDatabaseTable", ["ajaxDatabaseConfig", function(ajaxDatabaseConfig) {
	return {
		restrict: "A",
		require: "?ngModel",
		link: function(scope, element, attrs, ngModelCtrl) {
			
		}
	};
}]);
