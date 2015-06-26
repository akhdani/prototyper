define([
    'asset/js/momentjs',
    'component/alt/button/controller'
], function(){
    return alt.component({
        name: 'altDatepicker',
        templateUrl: 'component/alt/datepicker/view.html',
        scope: {
            datepicker: '=?altDatepicker',
            setting: '=?'
        },
        isskip: true,
        link: ['$scope', '$log', '$element', '$alert', '$validate', '$button', function($scope, $log, $element, $alert, $validate, $button){
            $scope.datepicker = $scope.datepicker || '';

            $scope.setting      = alt.extend({
                show: true,
                required: false,
                disabled: false,
                showclear: false,

                date: {
                    type: 'dropdown',
                    show: true,
                    disabled : false
                },
                month: {
                    type: 'dropdown',
                    show: true,
                    disabled : false
                },
                year: {
                    type: 'dropdown',
                    show: true,
                    disabled : false,
                    min: moment().format('YYYY')-5,
                    max: parseInt(moment().format('YYYY'))+5
                }
            }, $scope.setting);

            // dropdown data
            $scope.dropdown     = {
                date: {},
                month: {
                    '01': 'Januari',
                    '02': 'Februari',
                    '03': 'Maret',
                    '04': 'April',
                    '05': 'Mei',
                    '06': 'Juni',
                    '07': 'Juli',
                    '08': 'Agustus',
                    '09': 'September',
                    '10': 'Oktober',
                    '11': 'November',
                    '12': 'Desember'
                },
                year: {}
            };

            $scope.dropdown_month = function(){
                for(var i=1; i<=31; i++){
                    $scope.dropdown.date[String("0" + i).slice(-2)] = String("0" + i).slice(-2);
                }
            };
            $scope.dropdown_month();

            $scope.dropdown_year = function(){
                for(var i=$scope.setting.year.min; i<=$scope.setting.year.max; i++){
                    $scope.dropdown.year[i] = i;
                }
            };
            $scope.dropdown_year();

            $scope.watch = {
                datepicker: null,
                date: null
            };
            $scope.reload = function(){
                if($scope.watch.datepicker != null) $scope.watch.datepicker();
                if($scope.watch.date != null) $scope.watch.date();

                $scope.moment       = moment($scope.datepicker, 'YYYYMMDD');
                $scope.date         = {
                    date            : '',
                    month           : '',
                    year            : ''
                };

                $scope.watch.datepicker = $scope.$watch('datepicker', function(newvalue, oldvalue){
                    if(newvalue == '' && oldvalue != ''){
                        $scope.date.date    = '';
                        $scope.date.month   = '';
                        $scope.date.year    = '';
                    }else{
                        $scope.moment       = moment($scope.datepicker, 'YYYYMMDD');
                        $scope.date.date    = $scope.moment.format('DD');
                        $scope.date.month   = $scope.moment.format('MM');
                        $scope.date.year    = $scope.moment.format('YYYY');
                    }

                    if ($scope.setting.month.type == '' || $scope.setting.date.type == ''){
                        var dateformat = 'YYYY';
                        dateformat += $scope.setting.month.type == '' ? '' : 'MM';
                        dateformat += $scope.setting.date.type == '' ? '' : 'DD';

                        $scope.moment       = moment($scope.datepicker, dateformat);
                        $scope.date.date    = $scope.setting.date.type == '' ? '' : $scope.moment.format('DD');
                        $scope.date.month   = $scope.setting.month.type == '' ? '' : $scope.moment.format('MM');
                        $scope.date.year    = $scope.moment.format('YYYY');
                    }

                    if($scope.date.year <= $scope.setting.year.min){
                        $scope.setting.year.min = $scope.date.year;
                        $scope.dropdown_year();
                    }
                });

                $scope.watch.date = $scope.$watch('date.year + "" + date.month + "" + date.date', function(newvalue, oldvalue){
                    if(!$validate.date(newvalue)){
                        if(newvalue.length == 8 && $scope.setting.date.show){
                            alert('Tanggal tidak valid, harap ganti tanggal!');
                            $scope.date.date = '01';
                        }else if ($scope.setting.month.type == '' || $scope.setting.date.type == ''){
                            $scope.datepicker = $scope.date.year + "" + $scope.date.month + "" + $scope.date.date;
                        }
                    }else{
                        $scope.dropdown.date = {};
                        for(var i=1; i<=31; i++){
                            var date    = String("0" + i).slice(-2),
                                ymd     = $scope.date.year + '' + $scope.date.month + '' + date;

                            if($validate.date(ymd))
                                $scope.dropdown.date[date] = date;
                        }

                        $scope.datepicker = $scope.date.year + "" + $scope.date.month + "" + $scope.date.date;
                    }
                });
            };
            $scope.reload();

            $scope.clear = $button('', {
                'title'         : 'Clear',
                'description'   : 'Clear',
                'onclick'       : function(){
                    $scope.datepicker   = '';
                },
                'class'         : 'btn btn-warning'
            });

        }]
    });
});