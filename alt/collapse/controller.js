define([
    'component/alt/collapse/accordion/controller'
], function(){
    return alt.component({
        name: 'altCollapse',
        templateUrl: 'component/alt/collapse/view.html',
        transclude: true,
        scope: {
            altCollapse: '=?'
        },
        controller: ['$scope', '$log', function($scope, $log) {
            $scope.altCollapse = $scope.altCollapse || false;
            var accordions = $scope.accordions = [];

            this.select = $scope.select = function(accordion) {
                angular.forEach(accordions, function(a) {
                    if(a != accordion) a.selected = false;
                });
                accordion.selected = !accordion.selected;
            };

            this.addAccordion = $scope.addAccordion = function(accordion) {
                accordion.selected = false;
                if (accordions.length === 0 && $scope.altCollapse) {
                    $scope.select(accordion);
                }
                accordions.push(accordion);
            };
        }]
    });
});