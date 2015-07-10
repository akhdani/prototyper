define([
    'component/alt/button/controller',
    'component/ng/table'
], function(){
    return alt.component({
        name: 'altTableDynamic',
        templateUrl: 'component/alt/dyntable/view.html',
        transclude: true,
        scope: {
            dyntable: '=?altTableDynamic'
        },
        link: ['$scope', '$log', '$button', '$validate', function($scope, $log, $button, $validate){
            $scope.$validate    = $validate;

            $scope.dyntable     = alt.extend({
                action          : 'view',
                elementid       : $scope.$id,
                data            : [],
                newdata         : {},
                button          : {
                    add         : function(){
                        return $button('add', {title: '', disabled: $scope.dyntable.action == 'view',
                            onclick: function(){
                                $scope.dyntable.add();
                            }
                        });
                    },
                    edit        : function(index){
                        return $button('edit', {title: '', disabled: $scope.dyntable.action == 'view',
                            onclick: function(){
                                $scope.dyntable.edit(index);
                            }
                        });
                    },
                    remove      : function(index, info){
                        info = info || '';
                        return $button('remove', {id: index, title: '', disabled: $scope.dyntable.action == 'view',
                            onclick: function(){
                                if(confirm("Apakah anda yakin akan menghapus " + info + "?")) $scope.dyntable.remove(index);
                            }
                        });
                    }
                },
                is_validated    : function(){
                    return true;
                },
                add             : function(){
                    if ($scope.dyntable.is_validated()) {
                        $scope.dyntable.data.push(angular.copy($scope.dyntable.newdata));
                    }
                },
                remove          : function (index) {
                    $scope.dyntable.data.splice(index, 1);
                }
            }, $scope.dyntable);

            if($scope.dyntable.data.length == 0) $scope.dyntable.add();
        }]
    });
});