define([
], function(){
    return alt.component({
        name: 'altContainer',
        restrict: 'A',
        link: ['$scope', '$log', '$element', '$attrs', '$uuid', function($scope, $log, $element, $attrs, $uuid){
            var id = angular.element($element).attr("id"),
                targetid = $uuid.create(),
                target = null;

            if (!id) {
                id = $uuid.create();
                angular.element($element).attr("id", id);
            }
        }]
    });
});