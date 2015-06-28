define([
    'json!app/list.json',
    'component/alt/alert/controller',
    'component/alt/breadcrumbs/controller',
    'component/alt/blink/controller',
    'component/alt/button/controller',
    'component/alt/collapse/controller',
    'component/alt/codemirror/controller',
    'component/alt/draggable/controller',
    'component/alt/droppable/controller',
    'component/alt/file/controller',
    'component/alt/html/controller',
    'component/alt/fusioncharts/controller',
    'component/alt/menu/controller'
], function(apps){
    return [
        '$scope', '$routeParams', '$log', '$q', '$alert', '$button', '$location', '$storage', '$api', '$timeout',
        function($scope, $routeParams, $log, $q, $alert, $button, $location, $storage, $api, $timeout){
            $scope.$alert = $alert;

            // application menu
            $scope.appmenu = {
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

            // step to create application
            $scope.step = function(step, app){
                // save to storage first
                $scope.step.btnsave.onclick().then(function(){
                    $scope.step.get().then(function(){
                        // change step by changing location
                        $location.path('editor').search('step', step);
                        if(app) $location.search('app', alt.application);
                    });
                });
            };
            $scope.step.get = function(){
                var deferred = $q.defer();
                $storage(alt.application).get().then(function(response){
                    $scope.application = response.data;
                    $scope.menu.current.display.brand = $scope.application.name;
                    $scope.upload.json = angular.toJson(response.data);
                    deferred.resolve();
                });
                return deferred.promise;
            };
            $scope.step.current = $routeParams.step || 'welcome';
            $scope.step.btnsave = $button('save', {
                style: 'margin-left: 5px;',
                onclick: function(){
                    var deferred = $q.defer();
                    $storage(alt.application).save($scope.application).then(function(response){
                        $alert.add('Your work has been saved!', $alert.success);
                        deferred.resolve();
                    });
                    return deferred.promise;
                }
            });
            $scope.step.btnprev = $button('prev', {
                onclick: function(){
                    var step;
                    switch($scope.step.current){
                        case 'menu':
                            step = 'welcome';
                            break;
                        case 'page':
                            step = 'menu';
                            break;
                        case 'upload':
                            step = 'page';
                            break;
                        case 'finish':
                            step = 'upload';
                            break;
                    }
                    $scope.step(step, alt.application);
                }
            });
            $scope.step.btnnext = $button('next', {
                style: 'margin-left: 5px;',
                onclick: function(){
                    var step;
                    switch($scope.step.current){
                        case 'menu':
                            step = 'page';
                            break;
                        case 'page':
                            step = 'upload';
                            break;
                        case 'upload':
                            step = 'finish';
                            break;
                    }
                    $scope.step(step, alt.application);
                }
            });

            // check app from route params
            if($routeParams.app) $scope.step.get();

            // breadcrumbs showing steps
            $scope.breadcrumbs = {
                divider: function($index, item){
                    return $index != $scope.breadcrumbs.crumbs.length-1 ? '>' : '';
                },
                crumbs: [
                    {
                        title: 'Welcome',
                        class: $scope.step.current == 'welcome' ? 'active' : '',
                        href: alt.baseUrl + 'editor?step=welcome'
                    },
                    {
                        title: 'Menu',
                        class: alt.application == 'prototyper' || $scope.step.current == 'menu' ? 'active' : '',
                        href: alt.baseUrl + 'editor?step=menu&app=' + alt.application
                    },
                    {
                        title: 'Page',
                        class: alt.application == 'prototyper' || $scope.step.current == 'page' ? 'active' : '',
                        href: alt.baseUrl + 'editor?step=page&app=' + alt.application
                    },
                    {
                        title: 'Upload',
                        class: alt.application == 'prototyper' || $scope.step.current == 'upload' ? 'active' : '',
                        href: alt.baseUrl + 'editor?step=upload&app=' + alt.application
                    }
                ]
            };

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
                            $scope.step('menu', 'app');
                        }
                    }
                }),
                btnupload: $button('', {
                    title: 'Upload My Application!',
                    onclick: function () {
                        var fr = new FileReader();
                        fr.onload = function(e){
                            $scope.application = angular.fromJson(e.target.result);
                            alt.application = $scope.application.id;
                            $scope.step('upload', alt.application);
                        };
                        fr.readAsText($scope.welcome.file.model);
                    }
                })
            };

            // step menu
            $scope.menu = {
                current: {
                    id: '',
                    previd: '',
                    display: {
                        brand: 'Menu',
                        class: 'navbar-inverse',
                        menu: [],
                        link: function(type, item){
                            var link = 'showcase?app=' + alt.application;
                            switch(type){
                                case 'menu':
                                    link += '&page=' + item.page;
                                    break;
                            }

                            return alt.baseUrl + link;
                        }
                    }
                },
                btnadd: function(parent, key){
                    return $button('add', {
                        title: '',
                        onclick: function(){
                            var newitem = [];
                            angular.forEach(parent[key], function(obj){
                                newitem.push(obj);
                            });

                            newitem.push({
                                id: '',
                                label: '',
                                page: '',
                                submenu: []
                            });

                            parent[key] = newitem;
                        }
                    });
                },
                btnremove: function($index, item, parent, key){
                    return $button('remove', {
                        title: '',
                        onclick: function(){
                            var newitem = [];
                            angular.forEach(parent[key], function(v, k){
                                if(k != $index) newitem.push(v);
                            });
                            parent[key] = newitem;
                        }
                    });
                },
                btnreset: $button('reset', {
                    title: '',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        $scope.menu.choose('', [], '');
                    }
                }),
                btnsave: $button('save', {
                    title: '',
                    onclick: function(){
                        if($scope.menu.current.id != ''){
                            $scope.application.menus[$scope.menu.current.id] = $scope.menu.current.display.menu;
                            delete $scope.application.menus[$scope.menu.current.previd];
                            $scope.menu.choose($scope.menu.current.id, $scope.menu.current.display.menu);
                        }else{
                            $alert.add('Menu id not valid', $alert.danger);
                        }
                    }
                }),
                btndelete: $button('remove', {
                    title: '',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        if($scope.application.menus[$scope.menu.current.id]){
                            if(confirm('Are you sure want to delete menu ' + $scope.menu.current.id) + '?'){
                                delete $scope.application.menus[$scope.menu.current.id];
                                $scope.menu.btnreset.onclick();
                            }
                        }else{
                            $alert.add('Menu not found', $alert.danger);
                        }
                    }
                }),
                choose: function(id, item, previd){
                    $scope.menu.current.id = id;
                    $scope.menu.current.previd = previd || id;
                    $scope.menu.current.display.menu = item;
                }
            };

            // step page
            $scope.page = {
                current: {
                    id: '',
                    previd: '',
                    menu: '',
                    wireframe: true,
                    text: ''
                },
                btnpreview: $button('search', {
                    title: 'Preview',
                    description: 'Preview',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        $scope.step.btnsave.onclick().then(function(){
                            window.open(window.location.origin + window.location.pathname + alt.baseUrl + 'showcase?app=' + alt.application + '&page=' + $scope.page.current.id, '_blank');
                        });
                    }
                }),
                btncompsave: $button('save', {
                    title: '',
                    onclick: function(){

                    }
                }),
                btncompdelete: $button('remove', {
                    title: '',
                    style: 'margin-left: 5px;',
                    onclick: function(){

                    }
                }),
                btnreset: $button('reset', {
                    title: '',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        $scope.page.choose('', [], '');
                    }
                }),
                btnsave: $button('save', {
                    title: '',
                    onclick: function(){
                        if($scope.page.current.id != ''){
                            $scope.application.pages[$scope.page.current.id] = $scope.page.current.text;
                            delete $scope.application.pages[$scope.page.current.previd];
                            $scope.page.choose($scope.page.current.id, $scope.page.current.text);
                        }else{
                            $alert.add('page id not valid', $alert.danger);
                        }
                    }
                }),
                btndelete: $button('remove', {
                    title: '',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        if($scope.application.pages[$scope.page.current.id]){
                            if(confirm('Are you sure want to delete page ' + $scope.page.current.id) + '?'){
                                delete $scope.application.pages[$scope.page.current.id];
                                $scope.page.btnreset.onclick();
                            }
                        }else{
                            $alert.add('Page not found', $alert.danger);
                        }
                    }
                }),
                choose: function(id, item, previd){
                    $scope.page.current.id = id;
                    $scope.page.current.previd = previd || id;
                    $scope.page.current.menu = item.menu;
                    $scope.page.current.text = item.html;
                }
            };

            // step upload
            $scope.upload = {
                json: '',
                btndownload: $button('download', {
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        var blob = new Blob([$scope.upload.json], {type: 'application/json'}),
                            url = URL.createObjectURL(blob),
                            a = document.createElement('a');

                        a.download = $scope.application.id + '.json';
                        a.href = url;
                        a.click();
                    }
                }),
                btnupload: $button('upload', {
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        // upload to server
                        $api('api').connect('upload', {app: $scope.application.id, json: $scope.upload.json}, {ismultipart: true}).then(function(response){
                            $scope.step('finish');
                        }, function(error){
                            $alert.add('Unable to upload to server', $alert.danger);
                        });
                    }
                })
            };

            $scope.finish = {};
        }
    ];
});