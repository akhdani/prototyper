define([

], function(){
    return alt.component({
        name: "draggable",
        restrict: "A",
        link: ["$scope", "$element", "$attrs", "$controller", "$rootScope", "$uuid", function ($scope, $element, $attrs, $controller, $rootScope, $uuid) {
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
            });
        }]
    });
});