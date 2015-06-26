define([
    'asset/js/amcharts/amcharts'
], function(){
    AmCharts.isReady = true;

    return alt.component({
        name: 'prototyperChartAmcharts',
        templateUrl: 'component/prototyper/chart/amcharts/view.html',
        scope: {
            setting: '=?prototyperChartAmcharts',
            config: '=?'
        },
        isskip: true,
        link: ['$scope', '$log', '$element', '$timeout', function($scope, $log, $element, $timeout){
            $scope.setting      = alt.extend({
                isautoreload    : true,
                elementid       : "amcharts" + $scope.$id,
                objchart        : {},
                reload          : function(){
                    if($scope.setting.objchart.dataProvider){
                        $scope.setting.objchart.dataProvider = $scope.data;
                        $scope.setting.objchart.validateData();
                    }else{
                        $scope.setting.objchart = AmCharts.makeChart($scope.setting.elementid, alt.extend({
                            dataProvider: $scope.data
                        }, $scope.setting.chart));
                    }
                }
            }, $scope.setting);

            $scope.config = alt.extend({
                style: '',
                renderAt: $scope.setting.elementid,
                height: "100%",
                labelsEnabled: false,
                autoMargins: false,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                pullOutRadus: 0
            }, $scope.config);

            $timeout($scope.setting.reload);
        }]
    });
});