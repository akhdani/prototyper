define([
    'asset/js/accounting'
], function(){
    return alt.component({
        name: 'altNumber',
        templateUrl: 'component/alt/number/view.html',
        scope: {
            number: '=?altNumber',
            setting: '=?'
        },
        isskip: true,
        link: ['$scope', '$log', '$element', '$alert', '$validate', function($scope, $log, $element, $alert, $validate){
            $scope.number = $scope.number || '';

            $scope.setting      = alt.extend({
                number: 0,
                type: 'text',
                class: 'form-control',
                style: {'text-align': 'right'},
                show: true,
                prepend: {
                    show: false,
                    title: 'Rp'
                },
                append: {
                    show: false,
                    title: {
                        normal : '',
                        power : ''
                    }
                },
                required: false,
                disabled: false,
                decimals: 2,
                allowempty: false,
                allownegative: false,
                thousandSeparator: ".",
                decimalSeparator: ",",
                onchange: angular.noop
            }, $scope.setting);

            $scope.$watch('number', function(newvalue, oldvalue){
                var tmp     = (newvalue + '').split('.'),
                    decimals= $scope.setting.decimals > 0 ? (tmp.length > 1 ? (tmp[1].length > 0 ? (tmp[1].length > $scope.setting.decimals ? $scope.setting.decimals : tmp[1].length) : 1) : 0) : $scope.setting.decimals;
                if ($scope.setting.allowempty && $scope.number == ''){
                    $scope.setting.number = '';
                }else {
                    $scope.setting.number = accounting.formatNumber(newvalue, decimals, $scope.setting.thousandSeparator, $scope.setting.decimalSeparator);
                }
            });

            $scope.$watch('setting.number', function(newvalue, oldvalue){
                var regex = $scope.setting.allownegative ? /[^\-0-9\.\,]+/g : /[^0-9\.\,]+/g;
                $scope.setting.number = ($scope.setting.number + '').replace(regex, '');
                if ($scope.setting.allowempty && $scope.setting.number == ''){
                    $scope.number = '';
                }else {
                    $scope.number = accounting.unformat($scope.setting.number || 0, $scope.setting.decimalSeparator);
                }
            });
        }]
    });
});