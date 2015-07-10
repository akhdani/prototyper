define([

], function(){
    return alt.component({
        name: 'altMenu',
        templateUrl: 'component/alt/menu/view.html',
        scope: {
            setting: '=?altMenu',
            class: '@?',
            brand: '@?',
            link: '&?',
            menu: '=?'
        },
        link: ['$scope', '$log', function($scope, $log){
            $scope.setting = alt.extend({
                wireframe: $scope.wireframe || false,
                class: $scope.class || 'navbar-inverse navbar-fixed-top',
                menu: $scope.menu || [],
                brand: $scope.brand || '',
                link: $scope.link || angular.noop,
                template: {
                    id: "",
                    label: "Administrator",
                    pageid: "",
                    submenu: []
                },
                add: function(item){
                    var level = arguments.length-2,
                        menu = null;

                    for(var i=1; i<=level; i++){
                        menu = menu == null ? $scope.menu[arguments[i]] : menu[arguments[i]];
                    }
                    menu.push(item);
                }
            }, $scope.setting);

            $scope.menu = {
                submenu: ''
            };
        }]
    });
});