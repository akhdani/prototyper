define([

], function(){
    return alt.component({
        name: 'altDroppable',
        restrict: 'A',
        link: ['$scope', '$log', '$element', '$attrs', '$controller', '$rootScope', '$uuid', function ($scope, $log, $element, $attrs, $controller, $rootScope, $uuid) {
            if(!eval($attrs.altDroppable)) return;

            var id = angular.element($element).attr("id"),
                targetid = $uuid.create(),
                target = null;

            if (!id) {
                id = $uuid.create();
                angular.element($element).attr("id", id);
            }

            $element.bind("dragover", function (e) {
                if (e.preventDefault) e.preventDefault();

                e.dataTransfer.dropEffect = e.dataTransfer.getData("dropEffect");

                if($attrs.onDragOver) (function ($scope, e, targetid) {
                    eval($attrs.onDragOver);
                })($scope.$parent, e, targetid);

                return false;
            });

            $element.bind("dragenter", function (e) {
                if($attrs.onDragEnter) (function ($scope, e, targetid) {
                    eval($attrs.onDragEnter);
                })($scope.$parent, e, targetid);
            });

            $element.bind("dragleave", function (e) {
                if($attrs.onDragLeave) (function ($scope, e, targetid) {
                    eval($attrs.onDragLeave);
                })($scope.$parent, e, targetid);
            });

            $element.bind("drop", function (e) {
                if (e.preventDefault)  e.preventDefault();
                if (e.stopPropagation) e.stopPropagation();

                var data = e.dataTransfer.getData("text"),
                    srcid = e.dataTransfer.getData("id"),
                    dest = angular.element(document.getElementById(id)),
                    src = angular.element(document.getElementById(srcid)),
                    target = e.toElement;

                if($attrs.onDrop) (function ($scope, drag, drop, data, target) {
                    eval($attrs.onDrop);
                })($scope.$parent, src, dest, data, target);
            });
        }]
    });
});