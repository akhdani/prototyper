define([
    'json!app/list.json',
    'component/alt/menu/controller',
    'component/alt/html/controller'
], function(apps){
    return ['$scope', '$routeParams', '$log', '$storage', '$rootScope', function($scope, $routeParams, $log, $storage, $rootScope){
        $scope.showcase = alt.application === 'prototyper' ? 'list' : 'app';
        $scope.apps = apps;

        switch($scope.showcase){
            case 'list':
                // display list of showcases
                $scope.menu = {
                    brand: 'Prototyper',
                    menu: [{}],
                    link: function(type, item){
                        var link = '';
                        switch(type){
                            case 'menu':
                                link = item.page;
                                break;
                        }

                        return alt.baseUrl + link;
                    }
                };
                break;

            case 'app':
                // display showcase of specific app
                $scope.viewer = {};

                $storage(alt.application).get().then(function(response){
                    $scope.application = response.data;
                    $scope.application.page = $routeParams.page || $scope.application.page;
                    $scope.page = $scope.application.pages[$scope.application.page] || {};
                    $scope.menu = {
                        brand: $scope.application.name,
                        menu: $scope.application.menus[$scope.page.menu] || [],
                        link: function(type, item){
                            var link = 'showcase?app=' + alt.application;
                            switch(type){
                                case 'menu':
                                    link += '&page=' + item.page;
                                    break;
                            }

                            return alt.baseUrl + link;
                        }
                    };

                    $scope.page.html = $scope.page.html || '<h1>Error 404: Page not found</h1>';
                    $scope.page.script = $scope.page.script || '';
                    $scope.viewer.text = $scope.page.html;

                    try{
                        if($scope.page.script) (function($scope){ eval($scope.page.script) })($scope);
                    }catch(e){
                        alert('Ada error pada script page! \n' + e.stack);
                    }
                });
                break;
        }
    }];
});