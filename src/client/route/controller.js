define([
    'component/alt/blink/controller'
], function(){
    return ['$scope', '$routeParams', '$log', '$location', '$storage', '$rootScope', function($scope, $routeParams, $log, $location, $storage, $rootScope){
        $storage(alt.application).get().then(function(response){
            $scope.prototype = response.data
        });
    }];
});