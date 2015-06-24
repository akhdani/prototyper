define([
], function(){
    return alt.component({
        name: 'altToolbar',
        templateUrl: 'component/alt/toolbar/view.html',
        scope: {
            altToolbar: '=?',
            icon: '=?'
        },
        link: ['$scope', '$log', function($scope, $log){
            $scope.altToolbar = $scope.altToolbar || '';
            $scope.icon = $scope.icon || 'icon-puzzle-piece';
        }]
    });
});