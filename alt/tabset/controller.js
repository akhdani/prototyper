define([
    'component/prototyper/ui/tabset/tab/controller'
], function(){
    return alt.component({
        name: 'prototyperUiTabset',
        templateUrl: 'component/prototyper/ui/tabset/view.html',
        transclude: true,
        scope: {
            'tabset' : '=?prototyperUiTabset'
        },
        controller: ['$scope', '$log', function($scope, $log) {
            var tabs = $scope.tabs = [];

            $scope.select = function(tab) {
                angular.forEach(tabs, function(tab) {
                    tab.selected = false;
                });
                tab.selected = true;
            };

            this.add = $scope.add = function(tab) {
                if (tabs.length === 0 && tab.show) {
                    $scope.select(tab);
                }
                tabs.push(tab);
            };

            $scope.tabset = alt.extend({
                select: $scope.select,
                add: $scope.add
            }, $scope.tabset);
        }]
    });
});