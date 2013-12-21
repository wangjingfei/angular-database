var module = angular.module("ajaxDatabaseApp", ["ajax.database", "ngResource"]);

module.controller("ajaxDatabaseController", function($scope, $resource) {
	var Data = $resource("demo/data.json");

	Data.query(function(data) {
		$scope.data = data;
	});
});
