define([
], function(){
    return ['$scope', '$routeParams', '$log', '$location', function($scope, $routeParams, $log, $location){
        $scope.location = 'route/hello/controller.js';
        $log.debug($scope.location);
    }];
});