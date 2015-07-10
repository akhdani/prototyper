define([
    'component/alt/alert/service'
], function(){
    return alt.component({
        name: 'altAlert',
        templateUrl: 'component/alt/alert/view.html',
        transclude: true,
        scope: {
            setting: '=?altAlert',
            isshow: '=?',
            iscloseable: '=?',
            type: '@?',
            message: '@?',
            onclose: '&?'
        },
        link: ['$scope', '$log', function($scope, $log){
            $scope.setting = alt.extend({
                type: $scope.type || 'warning',
                message: $scope.message || '',
                isshow: $scope.isshow || false,
                iscloseable: typeof $scope.iscloseable !== 'undefined' ? $scope.iscloseable : true,
                onclose: $scope.onclose || angular.noop,
                close: function(){
                    if($scope.setting.iscloseable) $scope.setting.isshow = false;
                    $scope.onclose(this);
                }
            }, $scope.setting);
        }]
    });
});