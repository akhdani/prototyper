define([
], function(){
    return alt.component({
        name: 'altTab',
        require: '^altTabset',
        templateUrl: 'component/alt/tabset/tab/view.html',
        transclude: true,
        scope: {
            tab: '=?altTab',
            title: '@?'
        },
        link: ['$scope', '$log', '$controller', function($scope, $log, $controller){
            console.log('$scope tab', $scope);
            $scope.tab = angular.extend({
                id: $scope.$id,
                title: $scope.title || '',
                detail: {},
                show: true,
                selected: false
            }, $scope.tab);

            $controller.add($scope.tab);
        }]
    });
});