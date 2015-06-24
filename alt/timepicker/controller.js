define([
    'asset/js/momentjs',
    'component/alt/button/controller'
], function(){
    return alt.component({
        name: 'altTimepicker',
        templateUrl: 'component/alt/timepicker/view.html',
        scope: {
            timepicker: '=?altTimepicker',
            setting: '=?'
        },
        link: ['$scope', function($scope){
            $scope.timepicker = $scope.timepicker || '';

            $scope.setting      = alt.extend({
                show: true,
                required: false,
                disabled: false,

                hour: {
                    show        : true,
                    disabled    : false
                },
                minute: {
                    show        : true,
                    disabled    : false
                }
            }, $scope.setting);

            $scope.dropdown_hour = function(){
                var ret = {};
                for(var i = 0; i <= 23; i++){
                    var hour = i < 10 ? '0'+i : i.toString();
                    ret[hour] = hour;
                }
                return ret;
            };

            $scope.dropdown_minute = function(){
                var ret = {};
                for(var i = 0; i <= 59; i++){
                    var min = i < 10 ? '0'+i : i.toString();
                    ret[min] = min;
                }
                return ret;
            };

            $scope.dropdown = {
                hour : $scope.dropdown_hour(),
                minute : $scope.dropdown_minute()
            };

            $scope.watch = {
                timepicker: null,
                time: null
            };

            $scope.reload = function(){
                if($scope.watch.timepicker != null) $scope.watch.timepicker();
                if($scope.watch.time != null) $scope.watch.time();

                $scope.moment       = moment($scope.timepicker, 'HHmm');
                $scope.time         = {
                    hour            : '',
                    minute          : ''
                };

                $scope.watch.timepicker = $scope.$watch('timepicker', function(newvalue, oldvalue){
                    if(newvalue == '' && oldvalue != ''){
                        $scope.time.hour    = '';
                        $scope.time.minute  = '';
                    }else{
                        if (moment($scope.timepicker, 'HHmm').isValid()) {
                            $scope.moment = moment($scope.timepicker, 'HHmm');
                            $scope.time.hour = $scope.moment.format('HH');
                            $scope.time.minute = $scope.moment.format('mm');
                        }
                    }
                });

                $scope.watch.time = $scope.$watch('time.hour + "" + time.minute', function(newvalue, oldvalue){
                    $scope.timepicker = $scope.time.hour + "" + $scope.time.minute;
                });
            };
            $scope.reload();
        }]
    });
});