
var ctdwntimer=angular.module('ctdwntimer',[]);

ctdwntimer.controller('ctdwnController',['$scope','$timeout','$interval',function($scope,$timeout,$interval){
    $scope.seconds=0;
    $scope.remsecs=0;
    $scope.remmillsecs=0;
    
    $scope.setTimer=function(sec){
        $scope.seconds=0;
        $scope.remsecs=sec-1;
        $scope.remmillsecs=(sec)*100;
        if(sec>1) 
            $interval(function(){$scope.remsecs--;},1000,sec-1);
        else
            $scope.remsecs=0;
        $interval(function(){$scope.remmillsecs--;},10,(sec)*100);
    };
    
}]);