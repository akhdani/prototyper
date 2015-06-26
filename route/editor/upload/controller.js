define([
    'component/alt/breadcrumbs/controller',
    'component/alt/toolbar/controller',
    'component/alt/file/controller'
], function(){
    return ['$scope', '$routeParams', '$log', '$timeout', function($scope, $routeParams, $log, $timeout){
        $scope.breadcrumbs = [
            {
                'title': 'Editor',
                'href': alt.baseUrl + 'editor'
            },
            {
                'title': 'Upload',
                'class': 'active'
            }
        ];
    }];
});