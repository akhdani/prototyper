define([

], function(){
    return alt.component({
        name: 'html',
        templateUrl: null,
        scope: {
            config: '=?html',
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

            // wireframe mode, elements with .row added with .show-grid
            $scope.$watch('config.text', function(newvalue, oldvalue){
                $element.html($scope.config.text);
                if(!$scope.config.wireframe) $compile($element.contents())($scope);
            });
        }]
    });
});