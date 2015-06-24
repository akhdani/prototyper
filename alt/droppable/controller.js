define([

], function(){
    return alt.component({
        name: 'droppable',
        restrict: 'A',
        link: ['$scope', '$element', '$attrs', '$controller', '$rootScope', '$uuid', function ($scope, $element, $attrs, $controller, $rootScope, $uuid) {
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
                return false;
            });

            $element.bind("dragenter", function (e) {
                var etarget = angular.element(e.target);
                if((etarget.attr('class') || '').indexOf('span') > -1){
                    etarget.append('<div id="' + targetid + '" data-droppable="true" style="border: dashed 1px; background-color: grey; min-height: 30px;">Put component here</div>');
                    target = angular.element(document.getElementById(targetid));
                }
            });

            $element.bind("dragleave", function (e) {
                var etarget = angular.element(e.target);
                if((etarget.attr('class') || '').indexOf('span') == -1){
                    if(target) target.remove();
                    target = null;
                }
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

                    (function ($scope, drag, drop, data, target) {
                        eval($attrs.onDrop);
                    })($scope.$parent, src, dest, data, target);

                    if (target) target.remove();
                    target = null;
                }
            });
        }]
    });
});