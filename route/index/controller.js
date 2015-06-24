define([
    'asset/js/require/json!prototype.json',
    'component/button/controller'
], function(prototype){
    return ['$scope', '$routeParams', '$log', '$location', '$button', function($scope, $routeParams, $log, $location, $button){
        // try to import from prototype.json
        $scope.prototype = alt.extend(store.get(alt.application), prototype);
        if(prototype){
            store.set(alt.application, $scope.prototype);
            //$location.path('/page').search({pageid: prototype.default_page});
        }

        $scope.export = $button('export', {
            style: 'display: inline-block;',
            onclick: function(){
                var uri         = 'data:application/json;base64,';

                window.open(uri + window.btoa(angular.toJson($scope.prototype)), '_blank');
            }
        });
    }];
});