define([
    'asset/js/momentjs.min',
    'component/alt/button/controller'
], function(){
    return alt.component({
        name: 'altDropdown',
        templateUrl: 'component/alt/dropdown/view.html',
        scope: {
            dropdown: '=?altDropdown',
            setting: '=?'
        },
        isskip: true,
        link: ['$scope', '$log', '$element', '$alert', '$validate', '$timeout', '$button', '$q',
            function($scope, $log, $element, $alert, $validate, $timeout, $button, $q){
                $scope.dropdown     = $scope.dropdown || '';

                $scope.setting      = alt.extend({
                    show            : true,
                    required        : false,
                    disabled        : false,
                    readonly        : false,
                    isalwaysvalid   : true,
                    class           : "span12",
                    data            : [],
                    options         : [],
                    maxshow         : 10,
                    getData         : function(term){
                        var q = (term + '').toLowerCase(),
                            deferred = $q.defer(),
                            data = [];

                        for(var i=0; i<$scope.setting.data.length; i++) if($scope.setting.maxshow == 0 || data.length <= $scope.setting.maxshow) {
                            //$scope.setting.data[i].focusLabel = $scope.setting.data[i].focusLabel || $scope.setting.data[i].label;
                            //$scope.setting.data[i].blurLabel = $scope.setting.data[i].blurLabel || $scope.setting.data[i].label;

                            var label = ($scope.setting.data[i].label + '').toLowerCase(),
                                focusLabel = ($scope.setting.data[i].focusLabel + '').toLowerCase(),
                                blurLabel = ($scope.setting.data[i].blurLabel + '').toLowerCase();

                            if(q == '' || label.indexOf(q) >= 0 || focusLabel.indexOf(q) >= 0 || blurLabel.indexOf(q) >= 0){
                                data.push($scope.setting.data[i]);
                            }
                        }

                        deferred.resolve({status: 0, data: data});
                        return deferred.promise;
                    },
                    onchange    : angular.noop
                }, $scope.setting);

                $scope.isfirst = true;
                var watch1 = $scope.$watch('dropdown + "::" + setting.data.length', function(newvalue, oldvalue){
                    if($scope.setting.options.length == 0 && $scope.setting.data.length > 0 && $scope.isfirst){
                        $scope.setting.options = $scope.setting.maxshow > 0 ? $scope.setting.data.slice(0, $scope.setting.maxshow) : $scope.setting.data;
                    }
                    if($scope.dropdown != '' && $scope.setting.data.length > 0 && $scope.isfirst){
                        angular.forEach($scope.setting.data, function(item){
                            if(item.id == $scope.dropdown){
                                delete item.$$hashKey;
                                $scope.data = item;
                                $scope.data.text = $scope.data.blurLabel;
                            }
                        });
                        $scope.isfirst = false;
                        watch1();
                    }
                }, true);

                $scope.data = {
                    id          : '',
                    label       : '',
                    focusLabel  : '', // label for input on focus
                    blurLabel   : '', // label for input on blur
                    text        : ''
                };

                $scope.isfocus = false;
                $scope.isselect = false;
                $scope.isrequesting = false;
                $scope.requesting = function(term){
                    $scope.setting.getData(term).then(function(response){
                        $scope.setting.options = $scope.setting.maxshow > 0 ? response.data.slice(0, $scope.setting.maxshow) : response.data;
                        $scope.isrequesting = false;
                    }, function (error) {
                        $scope.isrequesting = false;
                    });
                };
                $scope.$watch('data.text', function (newvalue, oldvalue) {
                    if (newvalue != oldvalue && !$scope.isselect && !$scope.isrequesting) {
                        $scope.isrequesting = true;
                        $scope.requesting(newvalue);
                    }
                    $scope.isselect = false;
                });
                $scope.requesting('');

                $scope.$watch('dropdown', function(newvalue, oldvalue){
                    if($scope.dropdown == '' || (typeof $scope.dropdown === 'undefined')){
                        $scope.data.id = '';
                        $scope.data.label = '';
                        $scope.data.focusLabel = '';
                        $scope.data.blurLabel = '';
                        $scope.data.text = '';
                        $scope.isselect = true;
                    }
                });

                $scope.showOptions = false;

                $scope.select = function(data){
                    $scope.dropdown = data.id;
                    $scope.data = angular.copy(data);
                    $scope.data.focusLabel = $scope.data.focusLabel || $scope.data.label;
                    $scope.data.blurLabel = $scope.data.blurLabel || $scope.data.label;
                    $scope.data.text = $scope.isfocus ? $scope.data.focusLabel : $scope.data.blurLabel;
                    $scope.showOptions = false;
                    $scope.isselect = true;
                };

                $scope.onfocus = function(element, event){
                    $scope.isfocus = true;
                    $scope.focus();
                    if(event) event.preventDefault();
                };
                $scope.focus = function(){
                    $scope.index = -1;
                    $scope.showOptions = true;
                    $scope.data.text = $scope.data.focusLabel;
                    $timeout(function(){
                        $scope.$apply();
                    });
                };

                $scope.onblur = function(element, event){
                    $scope.isfocus = false;
                    $scope.showOptions = false;

                    $timeout(function(){
                        $scope.blur();
                    }, 500);
                };
                $scope.blur = function(){
                    $scope.data.text = $scope.data.blurLabel;

                    if($scope.setting.isalwaysvalid){
                        var found = false;
                        for(var i=0; i<$scope.setting.options.length; i++) if($scope.data.id != ''){
                            if($scope.setting.options[i].id == $scope.data.id && $scope.setting.options[i].blurLabel == $scope.data.text){
                                found = true;
                            }
                        }

                        if(!found){
                            $scope.data.isselect = true;
                            $scope.data.id = '';
                            $scope.data.label = '';
                            $scope.data.focusLabel = '';
                            $scope.data.blurLabel = '';
                            $scope.data.text = '';
                        }
                    }

                    $scope.index = -1;
                    $scope.setting.onchange();
                    $timeout(function(){
                        $scope.$apply();
                    });
                };
                $scope.pointer = function(){
                    if($scope.showOptions){
                        $scope.showOptions = false;
                        $scope.blur();
                    }else{
                        $scope.focus();
                    }
                };

                $scope.index = -1;
                $scope.keydown = function(element, event){
                    var isdown = false;
                    switch(event.keyCode) {
                        // up
                        case 38:
                            $scope.index -= $scope.index > 0 ? 1 : 0;
                            isdown = true;
                            break;

                        // down
                        case 40:
                            $scope.index += $scope.index < $scope.setting.options.length-1 ? 1 : 0;
                            isdown = true;
                            break;

                        // enter
                        case 13:
                            if($scope.setting.options[$scope.index]){
                                $scope.select($scope.setting.options[$scope.index]);
                            }
                            isdown = true;
                            break;
                    }
                    if(isdown){
                        $timeout(function(){
                            $scope.$apply();
                        });
                        event.preventDefault();
                    }
                };

                $timeout(function(){
                    var dropdown = angular.element(document.getElementById("dropdown" + $scope.$id)),
                        addon = angular.element(document.getElementById("addon" + $scope.$id)),
                        input = angular.element(document.getElementById("input" + $scope.$id)),
                        options = angular.element(document.getElementById("options" + $scope.$id));

                    if(input[0]) input[0].style.width = (dropdown[0].offsetWidth - addon[0].offsetWidth - 11) + "px";
                    if(options[0]) options[0].style.width = (dropdown[0].offsetWidth) + "px";
                });
        }]
    });
});