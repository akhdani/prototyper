define([

], function(){
    return alt.component({
        name: 'altFile',
        templateUrl: 'component/alt/file/view.html',
        scope: {
            setting: '=?altFile',
            model: '=?',
            show: '=?',
            required: '=?',
            disabled: '=?',
            accept: '@?',
            name: '@?',
            validate: '&?'
        },
        link: ['$scope', '$log', '$element', function($scope, $log, $element){
            $scope.elementid = 'file' + $scope.$id;

            $scope.setting = alt.extend({
                required: $scope.required || false,
                disabled: $scope.disabled || false,
                accept: $scope.accept || "application/pdf",
                name: $scope.name || $scope.elementid,
                class: $scope.class || "",
                style: $scope.style || "",
                model: $scope.model || null,
                validate: $scope.validate || function(file){
                    return true;
                },

                clear: function(){
                    $scope.element.value = null;
                },

                // set image on change
                onchange: function(element){
                    var file = angular.element($scope.element)[0].files[0];
                    if($scope.setting.validate(file)){
                        $scope.setting.model = file;
                        $scope.$apply();
                    }else{
                        $scope.setting.clear();
                    }
                }
            }, $scope.setting);

            $scope.element = angular.element($element).children()[0];
        }]
    });
});