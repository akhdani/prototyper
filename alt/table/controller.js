define([
    'component/ng/table'
], function(){
    return alt.component({
        name: 'prototyperTableSimple',
        templateUrl: 'component/prototyper/table/simple/view.html',
        scope: {
            setting: '=?prototyperTableSimple',
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