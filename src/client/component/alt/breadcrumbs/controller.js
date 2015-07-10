define([
], function(){
    return alt.component({
        name: 'altBreadcrumbs',
        templateUrl: 'component/alt/breadcrumbs/view.html',
        scope: {
            setting: '=?altBreadcrumbs',
            crumbs: '=?',
            divider: '&?'
        },
        link: ['$scope', '$log', function($scope, $log){
            $scope.setting = alt.extend({
                divider: $scope.divider || function($index, item){
                    return $index != $scope.setting.crumbs.length-1 ? '/' : '';
                },
                crumbs: $scope.crumbs || [
                    {
                        title: 'Home',
                        class: 'active',
                        href: ''
                    }
                ]
            }, $scope.setting);
        }]
    });
});