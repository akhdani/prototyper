define([
    'asset/js/require/json!prototype.json',
    'asset/js/html2canvas',
    'alt/definition',
    'alt/html/controller'
], function(prototype){
    return ['$scope', '$routeParams', '$log', '$timeout', '$rootScope', function($scope, $routeParams, $log, $timeout, $rootScope){
        $scope.prototype = alt.extend(store.get(alt.application), prototype);

        if($scope.prototype){
            $scope.currentPage = $scope.prototype.page[$routeParams.pageid] || {};
            $scope.currentPage.menu = $scope.currentPage.menu || '';
            $scope.currentPage.html = $scope.currentPage.html || '<h1>No page detected</h1>';
            $scope.currentPage.script = $scope.currentPage.script || '';
            $scope.currentPage.dependency = $scope.currentPage.dependency || [];
            $scope.currentPage.screenshot = $scope.currentPage.screenshot || '';

            // set menu
            $rootScope.pagemenu = $scope.prototype.menu[$scope.currentPage.menu] || [];

            require($scope.currentPage.dependency, function(){
                if($scope.currentPage.script){
                    try{
                        (function($scope){ eval($scope.currentPage.script) })($scope);
                    }catch(e){
                        alert('Ada error pada script page! \n' + e.stack);
                    }
                }

                $scope.currentPage.html = $scope.currentPage.html || '<h1>No page detected</h1>';
                $scope.currentPage.script = $scope.currentPage.script || '';
                $scope.currentPage.screenshot = $scope.currentPage.screenshot || '';
                $scope.page = $scope.currentPage.html;
                $scope.$apply();

                $timeout(function(){
                    html2canvas(document.body, {
                        onrendered: function(canvas) {
                            var screenshot = canvas.toDataURL();
                            if($scope.currentPage.screenshot != screenshot){
                                $scope.currentPage.screenshot = canvas.toDataURL();
                                store.set(alt.application, $scope.prototype);
                            }
                        }
                    });
                }, 1500);
            });
        }
    }];
});