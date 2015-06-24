define([
    'asset/js/codemirror/lib/codemirror'
], function(CodeMirror){
    return alt.component({
        name: 'prototyperFormCodemirror',
        templateUrl: 'component/codemirror/view.html',
        transclude: true,
        scope: {
            config: '=?prototyperFormCodemirror',
            mode: '@?',
            style: '@?',
            text: '=?'
        },
        link: ['$scope', '$log', '$button', '$element', '$interpolate', '$rootScope', function($scope, $log, $button, $element, $interpolate, $rootScope){
            $scope.elementid    = "codemirror" + $scope.$id;
            $scope.objcodemirror= {};
            $scope.config       = alt.extend({
                mode            : $scope.mode || '',
                style           : $scope.style || 'display: none;',
                text            : $scope.text || ''
            }, $scope.config);

            require([
                'asset/js/codemirror/mode/' + $scope.config.mode + '/' + $scope.config.mode
            ], function(){
                $scope.objcodemirror = CodeMirror.fromTextArea(document.getElementById($scope.elementid), {
                    lineNumbers: true,
                    mode: $scope.config.mode
                });

                var watch = $scope.$watch('config.text', function(newvalue, oldvalue){
                    $scope.objcodemirror.setValue($scope.config.text);
                    watch();
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