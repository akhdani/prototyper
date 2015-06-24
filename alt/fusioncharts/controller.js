requirejs.s.contexts._.config.shim['asset/js/fusioncharts-suite-xt/js/fusioncharts-charts' + (alt.useMinified ? '.min' : '')] = {
    deps: ['asset/js/fusioncharts-suite-xt/js/fusioncharts' + (alt.useMinified ? '.min' : '')]
};
requirejs.s.contexts._.config.shim['asset/js/fusioncharts-suite-xt/js/fusioncharts-gantt' + (alt.useMinified ? '.min' : '')] = {
    deps: ['asset/js/fusioncharts-suite-xt/js/fusioncharts' + (alt.useMinified ? '.min' : '')]
};
requirejs.s.contexts._.config.shim['asset/js/fusioncharts-suite-xt/js/fusioncharts-powercharts' + (alt.useMinified ? '.min' : '')] = {
    deps: ['asset/js/fusioncharts-suite-xt/js/fusioncharts' + (alt.useMinified ? '.min' : '')]
};
requirejs.s.contexts._.config.shim['asset/js/fusioncharts-suite-xt/js/fusioncharts-widgets' + (alt.useMinified ? '.min' : '')] = {
    deps: ['asset/js/fusioncharts-suite-xt/js/fusioncharts' + (alt.useMinified ? '.min' : '')]
};
requirejs.s.contexts._.config.shim['asset/js/fusioncharts-suite-xt/js/fusioncharts-maps' + (alt.useMinified ? '.min' : '')] = {
    deps: ['asset/js/fusioncharts-suite-xt/js/fusioncharts' + (alt.useMinified ? '.min' : '')]
};

define([
    'asset/js/fusioncharts-suite-xt/js/fusioncharts',
    'asset/js/fusioncharts-suite-xt/js/fusioncharts-charts',
    'asset/js/fusioncharts-suite-xt/js/fusioncharts-powercharts',
    'asset/js/fusioncharts-suite-xt/js/fusioncharts-widgets',
    'asset/js/fusioncharts-suite-xt/js/fusioncharts-maps',
    'asset/js/fusioncharts-suite-xt/js/fusioncharts-gantt'
], function(){
    return alt.component({
        name: 'altFusioncharts',
        templateUrl: 'alt/fusioncharts/view.html',
        scope: {
            config: '=?altFusioncharts',
            type: '@?',
            style: '@?',
            format: '@?',
            width: '@?',
            height: '@?',
            source: '=?'
        },
        link: ['$scope', '$log', '$element', '$timeout', function($scope, $log, $element, $timeout){
            $scope.elementid    = "fusioncharts" + $scope.$id;
            $scope.objchart     = {};
            $scope.config       = alt.extend({
                renderAt: $scope.elementid,
                style: $scope.style || '',
                type: $scope.type || '',
                dataFormat: $scope.format || 'json',
                width: $scope.width || '100%',
                height: $scope.height || '100%',
                dataSource: $scope.source || {}
            }, $scope.config);

            $scope.reload       = function(){
                $scope.objchart = new FusionCharts($scope.config);
                $scope.objchart.render();
            };

            $timeout($scope.reload);
        }]
    });
});