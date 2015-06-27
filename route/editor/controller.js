define([
    'json!app/list.json',
    'component/alt/alert/controller',
    'component/alt/blink/controller',
    'component/alt/button/controller',
    'component/alt/file/controller',
    'component/alt/menu/controller'
], function(apps){
    return [
        '$scope', '$routeParams', '$log', '$alert', '$button', '$location', '$storage', '$api', '$timeout',
        function($scope, $routeParams, $log, $alert, $button, $location, $storage, $api, $timeout){
            $scope.$alert = $alert;

            // application menu
            $scope.menu = {
                brand: 'Prototyper',
                menu: [{}],
                link: function(type, item){
                    var link = '';
                    switch(type){
                        case 'menu':
                            link = item.page;
                            break;
                    }

                    return alt.baseUrl + link;
                }
            };

            // application model
            $scope.application = {
                id: '',
                name: '',
                page: '',
                menus: {},
                pages: {}
            };

            if($routeParams.app){
                $storage(alt.application).get().then(function(response){
                    $scope.application = response.data;
                });
            }

            // step to create application
            $scope.step = $routeParams.step || 'welcome';

            // step welcome
            $scope.welcome = {
                file: {
                    model: null,
                    accept: 'application/json',
                    validate: function(file){
                        if(file.type != 'application/json') $alert.add('Only json file allowed!', $alert.danger);
                        return file.type == 'application/json';
                    }
                },
                btncreate: $button('', {
                    title: 'Create My Application!',
                    onclick: function () {
                        var isexist = false;
                        angular.forEach(apps, function(val, key){
                            isexist = val.id == $scope.application.id || isexist;
                        });

                        if(!isexist || (isexist && confirm('There is already exist application with id ' + $scope.application.id + '. Do you want to continue and edit previous application?'))){
                            alt.application = $scope.application.id;
                            delete $scope.application.id;
                            delete $scope.application.file;

                            $storage(alt.application).save($scope.application).then(function(response){
                                // change step by changing location
                                $location.path('editor').search('step', 'menu').search('app', alt.application);
                            });
                        }
                    }
                }),
                btnupload: $button('', {
                    title: 'Upload My Application!',
                    onclick: function () {
                        // upload to server
                        $api('api').connect('upload', {app: $scope.application.id, file: $scope.welcome.file.model}, {ismultipart: true}).then(function(response){
                            // change step by changing location
                            $location.path('editor').search('step', 'finish');
                        }, function(error){
                            $alert.add('Unable to upload to server', $alert.danger);
                        });
                    }
                })
            };

            /*$scope.export = $button('export', {
                style: 'display: inline-block;',
                onclick: function(){
                    var uri         = 'data:application/json;base64,';

                    window.open(uri + window.btoa(angular.toJson($scope.prototype)), '_blank');
                }
            });*/
        }
    ];
});