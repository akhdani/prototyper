define([
    'component/alt/button/service'
], function(){
    return alt.component({
        name: 'altButton',
        templateUrl: 'component/alt/button/view.html',
        transclude: true,
        scope: {
            config: '=?altButton',
            title: '@?',
            description: '@?',
            icon: '@?',
            href: '@?',
            disabled: '@?',
            onclick: '@?'
        },
        link: ['$scope', '$log', '$button', '$element', '$interpolate', '$rootScope', function($scope, $log, $button, $element, $interpolate, $rootScope){
            $scope.config       = alt.extend({
                title           : $scope.title || '',
                description     : $scope.description || '',
                href            : $scope.href || '',
                href2           : '',
                icon            : $scope.icon || '',
                style           : $scope.style || '',
                disabled        : $scope.disabled == 'true' || false,
                isclicked       : false,
                onclick         : $scope.onclick || angular.noop,
                click           : function(){
                    if($scope.config.disabled || $scope.config.isclicked || $scope.config.href != '') return;

                    var title = $scope.config.title;
                    $scope.config.isclicked = true;
                    $scope.config.title = $scope.config.title_clicked || title;

                    var click = $scope.config.onclick($scope.config);
                    if(typeof click !== 'undefined' && typeof click.then === 'function'){
                        click.then(function(){
                            $scope.config.isclicked = false;
                            $scope.config.title = title;
                        }, function(){
                            $scope.config.isclicked = false;
                            $scope.config.title = title;
                        });
                    }else{
                        $scope.config.isclicked = false;
                        $scope.config.title = title;
                    }
                }
            }, $scope.config);

            $scope.$watch('config.href', function(newvalue, oldvalue){
                try{
                    var href = $interpolate($scope.config.href)($rootScope);
                    $scope.config.href = $scope.config.href != href ? href : $scope.config.href;
                }catch(e){
                    console.log(href, e);
                }
            });

            $scope.$watch('config.onclick', function(newvalue, oldvalue){
                if(typeof newvalue === 'string'){
                    try{
                        var fnclick = $scope.config.onclick;
                        var onclick = (function($scope){ return eval('(function(){ ' + fnclick + '})') })($scope.$parent.$parent);
                        $scope.config.onclick = $scope.config.onclick != onclick ? onclick : $scope.config.onclick;
                    }catch(e){
                        console.log('onclick', e);
                    }
                }
            });

            $scope.$watch('config.disabled', function(value){
                if(value && $scope.config.href != ''){
                    $scope.config.href2 = $scope.config.href;
                    $scope.config.href = 'javascript:;';
                }else if(!value && $scope.config.href2 != '' && $scope.config.href != 'javascript:;'){
                    $scope.config.href = $scope.config.href2;
                    $scope.config.href2 = '';
                }
            });

            $element.attr('style', 'display:inline-block;' + $scope.config.style);
        }]
    });
});