define([
], function(){
    return alt.component({
        name: 'altAccordion',
        require: '^altCollapse',
        templateUrl: 'component/alt/collapse/accordion/view.html',
        scope: {
            title: '@',
            style: '@',
            'class': '@'
        },
        link: ['$scope', '$controller', '$log', function($scope, $controller, $log){
            $scope.$controller = $controller;
            $controller.addAccordion($scope);
        }]
    });
});