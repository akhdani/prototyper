define([

], function(){
    return alt.component({
        name: 'altBlink',
        templateUrl: 'component/alt/blink/view.html',
        transclude: true,
        scope: {
            setting: '=?altBlink',
            display: '=?',
            timeout: '@?',
            interval: '@?',
            count: '@?'
        },
        link: ['$scope', '$log', '$timeout', '$interval', '$element', function($scope, $log, $timeout, $interval, $element){
            $scope.setting = alt.extend({
                objtimeout: null,
                objinterval: null,
                display: $scope.display || true,
                timeout: $scope.timeout || 0,
                interval: $scope.interval || 1000,
                count: $scope.count || 0
            }, $scope.setting);

            $scope.setting.objtimeout = $timeout(function(){
                $scope.setting.objinterval = $interval(function(){
                    $element[0].style.visibility = $element[0].style.visibility == 'hidden' ? 'visible' : 'hidden';
                    $scope.setting.display = true;
                }, $scope.setting.interval, $scope.setting.count);
            }, $scope.setting.timeout);
        }]
    });
});