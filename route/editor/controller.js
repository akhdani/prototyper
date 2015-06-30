define([
    'json!app/list.json',
    'component/definition',
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
], function(apps, components){
    return [
        '$scope', '$routeParams', '$log', '$q', '$alert', '$button', '$location', '$storage', '$api', '$timeout', '$validate', '$uuid',
        function($scope, $routeParams, $log, $q, $alert, $button, $location, $storage, $api, $timeout, $validate, $uuid){
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
                $scope.step.get().then(function(){
                    // change step by changing location
                    $location.path('editor').search('step', step);
                    if(app) $location.search('app', alt.application);
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
                        if(
                            $validate().rule($validate.required($scope.application.id), 'Application ID must set!')
                                .rule($validate.required($scope.application.name), 'Application name must set!')
                                .check()
                        ){
                            var isexist = false;
                            angular.forEach(apps, function(val, key){
                                isexist = val.id == $scope.application.id || isexist;
                            });

                            if(!isexist || (isexist && confirm('There is already exist application with id ' + $scope.application.id + '. Do you want to continue and edit previous application?'))){
                                alt.application = $scope.application.id;
                                $scope.step.btnsave.onclick().then(function(){
                                    $scope.step('menu', alt.application);
                                });
                            }
                        }
                    }
                }),
                btnupload: $button('', {
                    title: 'Upload My Application!',
                    onclick: function () {
                        var fr = new FileReader();
                        fr.onload = function(e){
                            var application = angular.fromJson(e.target.result);

                            if(
                                $validate().rule($validate.required(application.id), 'Application ID must set!')
                                    .rule($validate.required(application.name), 'Application name must set!')
                                    .check()
                            ) {
                                $scope.application = application;
                                alt.application = $scope.application.id;
                                $scope.step.btnsave.onclick().then(function(){
                                    $scope.step('upload', alt.application);
                                });
                            }
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
                            if($scope.menu.current.id != $scope.menu.current.previd) delete $scope.application.menus[$scope.menu.current.previd];

                            $scope.step.btnsave.onclick().then(function(){
                                $scope.menu.choose($scope.menu.current.id, $scope.menu.current.display.menu);
                            });
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

                                $scope.step.btnsave.onclick().then(function(){
                                    $scope.menu.btnreset.onclick();
                                });
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
                components: components,
                current: {
                    id: '',
                    previd: '',
                    menu: '',
                    wireframe: true,
                    isdefault: false,
                    html: ''
                },
                btnpreview: $button('search', {
                    title: 'Preview',
                    description: 'Preview',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        if($scope.page.current.id){
                            $scope.page.btnsave.onclick().then(function(){
                                window.open(window.location.origin + window.location.pathname + alt.baseUrl + 'showcase?app=' + alt.application + '&page=' + $scope.page.current.id, '_blank');
                            });
                        }
                    }
                }),
                btnreset: $button('reset', {
                    title: '',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        $scope.page.choose('', {menu: '', html: ''});
                    }
                }),
                btnsave: $button('save', {
                    title: '',
                    onclick: function(){
                        var deferred = $q.defer();

                        if($scope.page.current.id != ''){
                            $scope.application.pages[$scope.page.current.id] = {
                                menu: $scope.page.current.menu,
                                html: $scope.page.current.html
                            };

                            if($scope.page.current.id != $scope.page.current.previd) delete $scope.application.pages[$scope.page.current.previd];
                            if($scope.page.current.isdefault) $scope.application.page = $scope.page.current.id;

                            $scope.step.btnsave.onclick().then(function(){
                                $scope.page.choose($scope.page.current.id, $scope.page.current);
                                deferred.resolve();
                            });
                        }else{
                            $alert.add('page id not valid', $alert.danger);
                            deferred.reject();
                        }

                        return deferred.promise;
                    }
                }),
                btndelete: $button('remove', {
                    title: '',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        if($scope.application.pages[$scope.page.current.id]){
                            if(confirm('Are you sure want to delete page ' + $scope.page.current.id) + '?'){
                                delete $scope.application.pages[$scope.page.current.id];

                                $scope.step.btnsave.onclick().then(function(){
                                    $scope.page.btnreset.onclick();
                                });
                            }
                        }else{
                            $alert.add('Page not found', $alert.danger);
                        }
                    }
                }),
                choose: function(id, item, previd){
                    $scope.page.current.id = id;
                    $scope.page.current.previd = previd || id;
                    $scope.page.current.menu = item.menu || '';
                    $scope.page.current.html = item.html || '';
                    $scope.page.current.isdefault = $scope.application.page == $scope.page.current.id;
                },

                // drag and drop function
                ondragstart:function(source){
                    var component = $scope.page.components.component[source.getAttribute('data-text')],
                        target = document.getElementById($scope.page.current.elementid);

                    if(typeof component.ondragstart === 'function'){
                        component.ondragstart(source, target);
                    }else{
                        angular.element(component.target ? target.querySelectorAll(component.target) : target).toggleClass('droppable');
                    }
                },
                ondragend:function(source){
                    var component = $scope.page.components.component[source.getAttribute('data-text')],
                        target = document.getElementById($scope.page.current.elementid);

                    if(typeof component.ondragend === 'function'){
                        component.ondragend(source, target);
                    }else{
                        $timeout(function(){
                            angular.element(component.target ? target.querySelectorAll(component.target) : target).toggleClass('droppable');
                        });
                    }
                },
                ondrop: function(drag, drop, data, target){
                    // try to call component on drop function
                    var dropEl = angular.element(target),
                        component = $scope.page.components.component[data],
                        html = component.html;

                    if(dropEl.hasClass('droppable')){
                        var btnselect = component.config ? '<a class="wireframe-hide" contenteditable="false" style="float: right; cursor: pointer; position: relative; right: -5px; background-color: #ccc; padding: 3px;" onclick="angular.element(this).scope().$parent.page.select(this.parentNode)">O</a>' : '',
                            btnremove = '<a class="wireframe-hide" contenteditable="false" style="float: right; cursor: pointer; position: relative; right: -5px; background-color: #ccc; padding: 3px;" onclick="angular.element(this).scope().$parent.page.remove(this.parentNode)">X</a>';

                        html = html.replace('{config}', angular.toJson(component.config));
                        html = html.replace('{label}', component.label);
                        html = html.replace('</', btnremove + btnselect + '</');

                        if(typeof component.ondrop === 'function'){
                            component.ondrop(dropEl, html);
                        }else{
                            dropEl.append(html);
                        }

                        $scope.page.current.html = angular.element(document.getElementById($scope.page.current.elementid)).html();
                        $scope.$apply();
                    }
                },

                // component function
                component: {
                    element: null,
                    attribute: '',
                    mode: 'javascript',
                    mime: 'application/json',
                    text: ''
                },
                remove: function(component){
                    component.parentNode.removeChild(component);
                },
                select: function(component){
                    var attributes = component.attributes,
                        attribute = '',
                        config = '';
                    for(var i=0; i<attributes.length; i++){
                        attribute = attributes[i];
                        if(attribute.nodeName.indexOf('data-alt') == 0){
                            config = attribute.nodeValue;
                            break;
                        }
                    }

                    if(attribute && config){
                        $scope.page.component.element = angular.element(component);
                        $scope.page.component.attribute = attribute.nodeName;
                        $scope.page.component.text = config;
                        $scope.$apply();
                    }
                },
                btncompsave: $button('save', {
                    title: '',
                    onclick: function(){
                        if($scope.page.component.element && $scope.page.component.attribute)
                            $scope.page.component.element.attr($scope.page.component.attribute, $scope.page.component.text);
                    }
                }),
                btncompclear: $button('reset', {
                    title: '',
                    style: 'margin-left: 5px;',
                    onclick: function(){
                        $scope.page.component.element = null;
                        $scope.page.component.attribute = '';
                        $scope.page.component.text = '';
                    }
                })
            };

            // do something on component config editor
            $scope.$watch('page.component.text', function(newvalue, oldvalue){
                if(newvalue != oldvalue && $scope.page.component.element){
                    $scope.page.component.element.attr($scope.page.component.attribute, $scope.page.component.text);
                }
            });

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