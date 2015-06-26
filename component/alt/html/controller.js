define([

], function(){
    return alt.component({
        name: 'altHtml',
        templateUrl: null,
        scope: {
            config: '=?altHtml',
            text: '=?',
            wireframe: '=?'
        },
        link: ['$scope', '$log', '$element', '$compile', '$attrs', function($scope, $log, $element, $compile, $attrs){
            $scope.elementid = 'html' + $scope.$id;
            $scope.config   =  alt.extend({
                text        : $scope.text || '',
                wireframe   : $scope.wireframe || false
            }, $scope.config);

            $element.attr('id', $scope.elementid);

            $scope.$watch('config.text', function(newvalue, oldvalue){
                $element.html($scope.config.text);
                $compile($element.contents())($scope);
            });
        }]
    });
});