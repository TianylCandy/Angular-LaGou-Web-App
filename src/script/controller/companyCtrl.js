'use strict';
angular.module('app').controller('companyCtrl',['$http','$state','$scope', function ($http,$state,$scope) {
    $http.get('/data/company.json?id='+$state.params.id).then(function(resp){
        if(resp.status='200'){ $scope.company=resp.data;}
    });
}]);