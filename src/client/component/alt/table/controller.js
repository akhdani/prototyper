define([
    'asset/lib/ng-table/dist/ng-table'
], function(){
    alt.module();

    return alt.component({
        name: 'altTable',
        templateUrl: 'component/alt/table/view.html',
        scope: {
            setting: '=?altTable',
            config: '=?'
        },
        isskip: true,
        link: ['$scope', '$log', '$element', '$timeout', function($scope, $log, $element, $timeout){

        }]
    });
});