define([

], function(){
    return alt.component({
        name: 'altHtml',
        templateUrl: 'component/alt/html/view.html',
        transclude: true,
        scope: {
            setting: '=?altHtml',
            text: '=?',
            wireframe: '=?'
        },
        link: ['$scope', '$log', '$element', '$compile', '$attrs', function($scope, $log, $element, $compile, $attrs){
            $scope.elementid = 'html' + $scope.$id;
            $scope.setting   =  alt.extend({
                text        : $scope.text || '',
                wireframe   : $scope.wireframe || false
            }, $scope.setting);

            $scope.$watch('setting.text', function(newvalue, oldvalue){
                var element = angular.element(document.getElementById($scope.elementid));
                element.html($scope.setting.text);
                if(!$scope.setting.wireframe) $compile(element.contents())($scope);
            });
        }]
    });
});