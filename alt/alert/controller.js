define([
    'alt/alert/service'
], function(){
    return alt.component({
        name: 'altAlert',
        templateUrl: 'alt/alert/view.html',
        transclude: true,
        scope: {
            setting: '=?altAlert'
        },
        link: ['$scope', '$log', function($scope, $log){
            $scope.setting = alt.extend({
                type: 'warning',
                message: '',
                isshow: false,
                iscloseable: true,
                close: function(){
                    if($scope.setting.iscloseable) $scope.setting.isshow = false;
                }
            }, $scope.setting);
        }]
    });
});