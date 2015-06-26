define([

], function(){
    return alt.component({
        name: 'altDroppable',
        restrict: 'A',
        link: ['$scope', '$element', '$attrs', '$controller', '$rootScope', '$uuid', function ($scope, $element, $attrs, $controller, $rootScope, $uuid) {
            console.log($scope);
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

                if($attrs.onDragOver) (function ($scope, e, target, targetid) {
                    eval($attrs.onDragOver);
                })($scope.$parent, e, target, targetid);

                return false;
            });

            $element.bind("dragenter", function (e) {
                if($attrs.onDragEnter) (function ($scope, e, target, targetid) {
                    eval($attrs.onDragEnter);
                })($scope.$parent, e, target, targetid);
            });

            $element.bind("dragleave", function (e) {
                if($attrs.onDragLeave) (function ($scope, e, target, targetid) {
                    eval($attrs.onDragLeave);
                })($scope.$parent, e, target, targetid);
            });

            $element.bind("drop", function (e) {
                var etarget = angular.element(e.target);
                if(etarget.attr('id') == targetid && target) {
                    if (e.preventDefault)  e.preventDefault();
                    if (e.stopPropagation) e.stopPropagation();

                    var data = e.dataTransfer.getData("text");
                    var srcid = e.dataTransfer.getData("id");
                    var dest = angular.element(document.getElementById(id));
                    var src = angular.element(document.getElementById(srcid));

                    if($attrs.onDrop) (function ($scope, drag, drop, data, target) {
                        eval($attrs.onDrop);
                    })($scope.$parent, src, dest, data, target);

                    if (target) target.remove();
                    target = null;
                }
            });
        }]
    });
});