alt.application = 'prototyper';
alt.version = '1.0.0';
alt.environment = 'development';
alt.urlArgs = alt.environment == 'production' ? '_v=' + alt.version : '_t=' + (+new Date());
alt.github = {
    user: 'niwasmala',
    project: 'prototyper'
};

requirejs.config({
    urlArgs: alt.urlArgs,
    paths : {
        text: 'asset/lib/requirejs-plugins/lib/text',
        async: 'asset/lib/requirejs-plugins/src/async',
        font: 'asset/lib/requirejs-plugins/src/font',
        goog: 'asset/lib/requirejs-plugins/src/goog',
        image: 'asset/lib/requirejs-plugins/src/image',
        json: 'asset/lib/requirejs-plugins/src/json',
        noext: 'asset/lib/requirejs-plugins/src/noext',
        mdown: 'asset/lib/requirejs-plugins/src/mdown',
        propertyParser : 'asset/lib/requirejs-plugins/src/propertyParser',
        markdownConverter : 'asset/lib/plugins/lib/Markdown.Converter'
    }
});

// advanced configuration
alt.config(['$sceDelegateProvider', function($sceDelegateProvider){
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://github.com/**',
        'https://ghbtns.com/**'
    ]);
}]);
alt.run(['$log', '$rootScope', '$storage', '$sce', '$q', function($log, $rootScope, $storage, $sce, $q){
    $rootScope.onRouteChanged = function($routeParams){
        var deferred = $q.defer();

        if($routeParams.altaction != 'showcase'){
            deferred.resolve();
        }else{
            if($routeParams.app) alt.application = $routeParams.app;

            require([
                'json!asset/json/' + alt.application + '.json'
            ], function(json){
                // try to import from json files, make sure if file is correct
                var validate = function(json){
                    var res = true,
                        message = [];

                    if(message.length != 0) alert('Gagal melakukan import dari file \'asset/json/' + alt.application + '.json\'!\n' + message.join('\n'));

                    return res;
                };

                if(!validate(json)) return;

                var storage = $storage(alt.application);
                storage.get().then(function(response){
                    storage.save(alt.extend(response.data, json)).then(function(response){
                        storage.get().then(function(response){
                            deferred.resolve(response);
                        });
                    });
                });
            }, function(error){
                deferred.reject(error);
            });
        }

        return deferred.promise;
    };
}]);