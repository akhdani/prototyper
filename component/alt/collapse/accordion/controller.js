define([
], function(){
    return alt.component({
        name: 'altAccordion',
        require: '^altCollapse',
        templateUrl: 'component/alt/collapse/accordion/view.html',
        transclude: true,
        scope: {
            setting: '=?altAccordion',
            title: '@?',
            style: '@?',
            class: '@?',
            selected: '=?'
        },
        link: ['$scope', '$log', '$timeout', function($scope, $log, $timeout){
            $scope.setting = alt.extend({
                id: $scope.$id,
                title: $scope.title || '',
                style: $scope.style || '',
                class: $scope.class || '',
                selected: $scope.selected || false
            }, $scope.setting);

            var findParent = function($scope){
                return $scope.$component && $scope.$component == 'altCollapse' ? $scope.setting : findParent($scope.$parent);
            };

            $timeout(function(){
                $scope.collapse = findParent($scope);
                $scope.collapse.add($scope.setting);
            });
        }]
    });
});