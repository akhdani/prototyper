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
        templateUrl: 'component/alt/fusioncharts/view.html',
        scope: {
            setting: '=?altFusioncharts',
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

            $scope.setting      = alt.extend({
                style: $scope.style || '',
                class: $scope.class || '',
                type: $scope.type || '',
                dataFormat: $scope.format || 'json',
                width: $scope.width || '100%',
                height: $scope.height || '100%',
                dataSource: $scope.source || {}
            }, $scope.setting);

            $scope.reload       = function(){
                $timeout(function(){
                    $scope.setting.renderAt = document.getElementById($scope.elementid);

                    $scope.objchart = new FusionCharts($scope.setting);
                    $scope.objchart.render();
                });
            };

            $scope.reload();
        }]
    });
});