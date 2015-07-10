define([
    'component/alt/collapse/accordion/controller'
], function(){
    return alt.component({
        name: 'altCollapse',
        templateUrl: 'component/alt/collapse/view.html',
        transclude: true,
        scope: {
            setting: '=?altCollapse',
            first: '=?'
        },
        controller: ['$scope', '$log', function($scope, $log) {
            $scope.setting = alt.extend({
                first: typeof $scope.first !== 'undefined' ? $scope.first : true,
                accordions: [],
                add: function(accordion) {
                    accordion.selected = false;
                    if ($scope.setting.accordions.length === 0 && $scope.setting.first) {
                        $scope.setting.select(accordion);
                    }
                    $scope.setting.accordions.push(accordion);
                },
                select: function(accordion) {
                    angular.forEach($scope.setting.accordions, function(obj) {
                        if(obj.id != accordion.id) obj.selected = false;
                    });
                    accordion.selected = !accordion.selected;
                }
            }, $scope.setting);
        }]
    });
});