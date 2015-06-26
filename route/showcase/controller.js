define([
    'component/alt/menu/controller',
    'component/alt/html/controller'
], function(){
    return ['$scope', '$routeParams', '$log', '$storage', '$rootScope', function($scope, $routeParams, $log, $storage, $rootScope){
        $scope.viewer = {};

        $storage(alt.application).get().then(function(response){
            $scope.application = response.data;
            $scope.application.page = $routeParams.page || $scope.application.page;
            $scope.page = $scope.application.pages[$scope.application.page];
            $scope.menu = $scope.application.menus[$scope.page.menu] || [];

            require($scope.page.dependency, function(){
                $scope.page.html = $scope.page.html || '<h1>No page detected</h1>';
                $scope.page.script = $scope.page.script || '';
                $scope.viewer.text = $scope.page.html;

                try{
                    if($scope.page.script) (function($scope){ eval($scope.page.script) })($scope);
                }catch(e){
                    alert('Ada error pada script page! \n' + e.stack);
                }

                $scope.$apply();
            });
        });
    }];
});