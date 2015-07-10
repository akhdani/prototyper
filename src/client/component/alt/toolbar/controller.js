define([
], function(){
    return alt.component({
        name: 'altToolbar',
        templateUrl: 'component/alt/toolbar/view.html',
        transclude: true,
        scope: {
            setting: '=?',
            title: '@?',
            icon: '@?'
        },
        link: ['$scope', '$log', function($scope, $log){
            $scope.setting = alt.extend({
                title: $scope.title || 'Toolbar Title',
                icon: $scope.icon || 'fa fa-puzzle-piece'
            }, $scope.setting);
        }]
    });
});