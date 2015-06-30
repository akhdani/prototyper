define([

], function(){
    return alt.component({
        name: "altDraggable",
        restrict: "A",
        link: ["$scope", "$element", "$attrs", "$controller", "$rootScope", "$uuid", function ($scope, $element, $attrs, $controller, $rootScope, $uuid) {
            if(!(eval($attrs.altDraggable))) return;

            var element = angular.element($element),
                id = element.attr("id");

            element.attr("draggable", "true");

            if (!id) {
                id = $uuid.create();
                element.attr("id", id);
            }

            $element.bind("dragstart", function (e) {
                e.dataTransfer.setData("id", id);
                e.dataTransfer.setData("dropEffect", $attrs.dropEffect || 'move');
                e.dataTransfer.setData("text", $attrs.text);

                if($attrs.onDragStart) (function ($scope, e, element) {
                    eval($attrs.onDragStart);
                })($scope.$parent, e, $element[0]);
            });

            $element.bind("dragend", function (e) {
                if($attrs.onDragEnd) (function ($scope, e, element) {
                    eval($attrs.onDragEnd);
                })($scope.$parent, e, $element[0]);
            });
        }]
    });
});