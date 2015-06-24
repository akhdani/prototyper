// configuration files
alt.application = 'prototyper';
alt.windowTitle = 'Prototyper :: Making prototype easy';
alt.version = '1.0.0';
alt.environment = 'development';

// advanced configuration
alt.run(['$log', '$q', '$rootScope', '$route', '$auth', '$api', '$window', function($log, $q, $rootScope, $route, $auth, $api, $window){
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        alt.menu = alt.menuFolder + '/' + (currRoute.params.altaction == 'viewer' ? 'prototyper' : 'public') + '.html';
        $rootScope.menuLocation = alt.menu;
    });
}]);
