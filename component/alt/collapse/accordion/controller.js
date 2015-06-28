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
        link: ['$scope', '$log', function($scope, $log){
            $scope.setting = alt.extend({
                id: $scope.$id,
                title: $scope.title || '',
                style: $scope.style || '',
                class: $scope.class || '',
                selected: $scope.selected || false
            }, $scope.setting);

            $scope.collapse = $scope.$parent.$parent.setting;
            $scope.collapse.add($scope.setting);
        }]
    });
});