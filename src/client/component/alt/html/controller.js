define([

], function(){
    return alt.component({
        name: 'altHtml',
        templateUrl: null,
        transclude: true,
        scope: {
            setting: '=?altHtml',
            html: '=?',
            wireframe: '=?'
        },
        link: ['$scope', '$log', '$element', '$compile', '$attrs', function($scope, $log, $element, $compile, $attrs){
            $scope.setting  =  alt.extend({
                elementid   : 'html' + $scope.$id,
                html        : $scope.html || '',
                wireframe   : $scope.wireframe || false
            }, $scope.setting);

            $element.attr('id', $scope.setting.elementid);

            $scope.$watch('setting.html', function(newvalue, oldvalue){
                if($scope.setting.html != $element.html()){
                    $element.html($scope.setting.html);
                    if(!$scope.setting.wireframe) $compile($element.contents())($scope);
                }
            });

            if($scope.setting.wireframe) {
                $scope.$watch(function () {
                    return $element.html();
                }, function (newvalue, oldvalue) {
                    if ($scope.setting.html != $element.html()) $scope.setting.html = $element.html();
                });
            }
        }]
    });
});