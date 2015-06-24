define([
    'asset/js/require/json!prototype.json',
    'alt/definition',
    'alt/draggable/controller',
    'alt/droppable/controller',
    'alt/html/controller',
    'asset/js/html2canvas'
], function(prototype, definition){
    return ['$scope', '$routeParams', '$log', '$timeout', function($scope, $routeParams, $log, $timeout){
        $scope.prototype = alt.extend(store.get(alt.application), prototype);
        $scope.definition = definition;
        $scope.wireframe = {};
        $scope.viewer = {};

        $scope.dropped = function(drag, drop, data, target) {
            var component = definition.component[data];
            var html = '<div data-draggable="true" data-' + data + "='" + angular.toJson(component.config) + "'><span style='border: dashed 1px; min-height: 50px;'>" + component.label + "</span></div>";
            target.replaceWith(angular.element(html));

            $scope.wireframe.text = drop.html();
            $scope.$apply();
        };

        $scope.currentPage = $scope.prototype.page[$routeParams.pageid] || {};
        $scope.currentPage.dependency = $scope.currentPage.dependency || [];

        require($scope.currentPage.dependency, function(){
            if($scope.currentPage.script){
                try{
                    (function($scope){ eval($scope.currentPage.script) })($scope);
                }catch(e){
                    alert('Ada error pada script page! \n' + e.stack);
                }
            }

            $scope.currentPage.html = $scope.currentPage.html || '<h1>No page detected</h1>';
            $scope.currentPage.script = $scope.currentPage.script || '';
            $scope.currentPage.screenshot = $scope.currentPage.screenshot || '';
            $scope.wireframe.text = $scope.currentPage.html;
            $scope.viewer.text = $scope.currentPage.html;
            $scope.$apply();

            $scope.$watch('wireframe.text', function(newvalue, oldvalue){
                $log.debug($scope.wireframe.text);
                $scope.currentPage.html = $scope.wireframe.text;
                $scope.viewer.text = $scope.wireframe.text;
            }, true);


            /*$timeout(function(){
             html2canvas(document.body, {
             onrendered: function(canvas) {
             var screenshot = canvas.toDataURL();
             if($scope.currentPage.screenshot != screenshot){
             $scope.currentPage.screenshot = canvas.toDataURL();
             store.set(alt.application, $scope.prototype);
             }
             }
             });
             }, 1500);*/
        });
    }];
});