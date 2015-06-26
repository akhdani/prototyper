define([
], function(){
    return alt.component({
        name: 'altBreadcrumbs',
        templateUrl: 'component/alt/breadcrumbs/view.html',
        scope: {
            setting: '=?altBreadcrumbs',
            crumbs: '=?'
        },
        link: ['$scope', '$log', function($scope, $log){
            $scope.setting = alt.extend({
                crumbs: $scope.crumbs || [
                    {
                        'title': 'Home',
                        'class': 'active',
                        'href': ''
                    }
                ]
            }, $scope.setting);
        }]
    });
});