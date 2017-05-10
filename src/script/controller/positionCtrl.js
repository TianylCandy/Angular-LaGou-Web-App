'use strict';
angular.module('app').controller('positionCtrl',['cache','$q','$http','$state','$scope','$log', function (cache,$q,$http,$state,$scope,$log) {
    $scope.isLogin=!!cache.get('name');
    $scope.message=$scope.isLogin?'投个简历':'去登录';
    function getPosition(){
        var def=$q.defer();
        $http.get('/data/position.json?id='+$state.params.id).then(function(resp){
            if(resp.status=='200'){
                $scope.position=resp.data;
            }
            if(resp.data.posted){
                $scope.message='已投递';
            }
            def.resolve(resp.data);
        }).catch(function (err) {
            def.reject(err);
        });
        return def.promise;
    }
    function getCompany(id){
        $http.get('data/company.json?id='+id).then(function (resp) {
            if(resp.status=='200'){$scope.company=resp.data}
        })
    }
    getPosition().then(function (obj) {
        getCompany(obj.companyId);
    })
    $scope.go= function () {
        if($scope.message !=='已投递'){
            if($scope.isLogin ){
                $http.post('data/handle.json',{
                    id:$scope.position.id
                }).then(function (resp) {
                    $log.info(resp);
                    $scope.message='已投递';
                })
            }else {
                $state.go('login');
            }
        }

    }
}]);
