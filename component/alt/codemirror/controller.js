define([
    'asset/lib/codemirror/lib/codemirror'
], function(CodeMirror){
    return alt.component({
        name: 'altCodemirror',
        templateUrl: 'component/alt/codemirror/view.html',
        transclude: true,
        scope: {
            config: '=?altCodemirror',
            mode: '@?',
            mime: '@?',
            style: '@?',
            text: '=?'
        },
        link: ['$scope', '$log', '$button', '$element', '$interpolate', '$rootScope', function($scope, $log, $button, $element, $interpolate, $rootScope){
            $scope.elementid    = "codemirror" + $scope.$id;
            $scope.objcodemirror= {};
            $scope.config       = alt.extend({
                mode            : $scope.mode || 'javascript',
                mime            : $scope.mime || 'application/json',
                style           : $scope.style || 'display: none;',
                text            : $scope.text || ''
            }, $scope.config);

            require([
                'asset/lib/codemirror/mode/' + $scope.config.mode + '/' + $scope.config.mode
            ], function(){
                $scope.objcodemirror = CodeMirror.fromTextArea(document.getElementById($scope.elementid), {
                    lineNumbers: true,
                    lineWrapping: true,
                    scrollbarStyle: null,
                    mode: $scope.config.mime
                });

                $scope.$watch('config.text', function(newvalue, oldvalue){
                    if($scope.config.text != $scope.objcodemirror.getValue()) $scope.objcodemirror.setValue($scope.config.text);
                });

                $scope.objcodemirror.on('change', function(cm, change){
                    if($scope.config.text != cm.getValue()){
                        $scope.config.text = cm.getValue();
                        $scope.$apply();
                    }
                });
            });
        }]
    });
});