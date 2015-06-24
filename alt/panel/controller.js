define([
], function(){
    return alt.component({
        name: 'altPanel',
        templateUrl: 'component/alt/panel/view.html',
        scope: {
            detail: '=?altPanel',
            icon: '=?'
        },
        link: ['$scope', '$log', function($scope, $log){
            $scope.detail = alt.extend({
                title       : '',
                background  : '',
                iconbg      : {
                    icon    : '',
                    color   : ''
                },
                controls    : []
            }, $scope.detail);
        }]
    });
});