define([
    'component/alt/button/service'
], function(){
    return alt.component({
        name: 'altButton',
        templateUrl: 'component/alt/button/view.html',
        transclude: true,
        scope: {
            setting: '=?altButton',
            title: '@?',
            description: '@?',
            icon: '@?',
            href: '@?',
            target: '@?',
            style: '@?',
            disabled: '@?',
            onclick: '@?'
        },
        link: ['$scope', '$log', '$button', '$element', '$interpolate', '$rootScope', function($scope, $log, $button, $element, $interpolate, $rootScope){
            $scope.setting      = alt.extend({
                title           : $scope.title || '',
                description     : $scope.description || '',
                href            : $scope.href || '',
                target          : $scope.target || '_self',
                href2           : '',
                icon            : $scope.icon || '',
                style           : $scope.style || 'display:inline-block;',
                disabled        : $scope.disabled == 'true' || false,
                isclicked       : false,
                onclick         : $scope.onclick || angular.noop,
                click           : function(){
                    if($scope.setting.disabled || $scope.setting.isclicked || $scope.setting.href != '') return;

                    var title = $scope.setting.title;
                    $scope.setting.isclicked = true;
                    $scope.setting.title = $scope.setting.title_clicked || title;

                    var click = $scope.setting.onclick($scope.setting);
                    if(typeof click !== 'undefined' && typeof click.then === 'function'){
                        click.then(function(){
                            $scope.setting.isclicked = false;
                            $scope.setting.title = title;
                        }, function(){
                            $scope.setting.isclicked = false;
                            $scope.setting.title = title;
                        });
                    }else{
                        $scope.setting.isclicked = false;
                        $scope.setting.title = title;
                    }
                }
            }, $scope.setting);

            $scope.$watch('config.href', function(newvalue, oldvalue){
                try{
                    var href = $interpolate($scope.setting.href)($rootScope);
                    $scope.setting.href = $scope.setting.href != href ? href : $scope.setting.href;
                }catch(e){
                    console.log(href, e);
                }
            });

            $scope.$watch('config.onclick', function(newvalue, oldvalue){
                if(typeof newvalue === 'string'){
                    try{
                        var fnclick = $scope.setting.onclick;
                        var onclick = (function($scope){ return eval('(function(){ ' + fnclick + '})') })($scope.$parent.$parent);
                        $scope.setting.onclick = $scope.setting.onclick != onclick ? onclick : $scope.setting.onclick;
                    }catch(e){
                        console.log('onclick', e);
                    }
                }
            });

            $scope.$watch('config.disabled', function(value){
                if(value && $scope.setting.href != ''){
                    $scope.setting.href2 = $scope.setting.href;
                    $scope.setting.href = 'javascript:;';
                }else if(!value && $scope.setting.href2 != '' && $scope.setting.href != 'javascript:;'){
                    $scope.setting.href = $scope.setting.href2;
                    $scope.setting.href2 = '';
                }
            });

            $element.attr('style', $scope.setting.style);
        }]
    });
});