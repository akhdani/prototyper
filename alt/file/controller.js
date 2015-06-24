define([
    'component/alt/button/controller'
], function(){
    return alt.component({
        name: 'altFile',
        templateUrl: 'component/alt/file/view.html',
        scope: {
            file: '=?altFile',
            setting: '=?'
        },
        link: ['$scope', '$log', '$element', '$alert', '$validate', '$button', function($scope, $log, $element, $alert, $validate, $button){
            $scope.setting      = alt.extend({
                elementid: 'file' + $scope.$id,
                show: true,
                required: false,
                disabled: false,
                accept: "application/pdf",
                'class': "",
                style: {},

                clear: function(){
                    $scope.setting.element.value = null;
                },

                // set image on change
                onchange: function(element){
                    if(typeof File === 'undefined' && typeof FileAPI !== 'undefined'){
                        FileAPI.debug = true;
                        var files = FileAPI.getFiles(angular.element($scope.setting.element)[0]);
                        $scope.file = files[0];

                        $scope.file.getAsBinary = angular.noop;
                        FileAPI.readAsBinaryString($scope.file, function(event){
                            if(event.type == 'load'){
                                $scope.file.getAsBinary = function(){
                                    return event.result;
                                }
                            }
                        });
                    }else{
                        $scope.file = angular.element($scope.setting.element)[0].files[0];
                    }

                    $scope.$apply();
                }
            }, $scope.setting);
            $scope.setting.element = angular.element($element).children()[0];
        }]
    });
});