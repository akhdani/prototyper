define([
    'component/alt/collapse/controller',
    'component/alt/button/controller'
], function(){
    return alt.component({
        name: 'altFilter',
        templateUrl: 'component/alt/filter/view.html',
        transclude: true,
        scope: {
            filter: '=?altFilter',
            'default': '=?',
            table: '=?',
            dashboard: '=?',
            setting: '=?'
        },
        link: ['$scope', '$log', '$button', '$location', '$routeParams', function($scope, $log, $button, $location, $routeParams){
            $scope.filter   = alt.extend((store.get(alt.application + '_filter') || {})[$location.$$absUrl] || {}, $scope.filter);
            $scope.default  = alt.extend($scope.filter, angular.copy($scope.default));
            $scope.setting  = alt.extend({
                autofilter  : false
            }, $scope.setting);

            // tombol reset
            $scope.resetbtn = $button("reset");
            $scope.resetbtn.onclick = function () {
                for(var i in $scope.filter) if($scope.filter.hasOwnProperty(i)){
                    if(typeof $routeParams[i] === 'undefined') {
                        delete $scope.filter[i];
                    }
                }
                $scope.filter = alt.extend($scope['default'], $scope.filter);

                var f = {};
                f[$location.$$absUrl] = $scope.filter;
                store.set(alt.application + '_filter', f);
                if(typeof $scope.table !== 'undefined'){
                    $scope.table.filter(angular.copy($scope.filter));
                    $scope.table.resetSorting();
                    $scope.table.reload();
                }else if(typeof $scope.dashboard !== 'undefined'){
                    $scope.dashboard.reload(angular.copy($scope.filter));
                }
            };

            // tombol filter
            $scope.filterbtn = $button("search");
            $scope.filterbtn.onclick = function () {
                var f = {};
                f[$location.$$absUrl] = $scope.filter;
                store.set(alt.application + '_filter', f);
                if(typeof $scope.table !== 'undefined'){
                    $scope.table.filter(angular.copy($scope.filter));
                    $scope.table.reload();
                }else if(typeof $scope.dashboard !== 'undefined'){
                    $scope.dashboard.reload(angular.copy($scope.filter));
                }
            };
        }]
    });
});