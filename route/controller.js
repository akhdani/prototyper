define([
    'component/alt/blink/controller',
    'component/alt/button/controller'
], function(){
    return ['$scope', '$routeParams', '$log', '$location', '$button', '$storage', function($scope, $routeParams, $log, $location, $button, $storage){
        $storage(alt.application).get().then(function(response){
            $scope.prototype = response.data
        });

        $scope.export = $button('export', {
            style: 'display: inline-block;',
            onclick: function(){
                var uri         = 'data:application/json;base64,';

                window.open(uri + window.btoa(angular.toJson($scope.prototype)), '_blank');
            }
        });
    }];
});