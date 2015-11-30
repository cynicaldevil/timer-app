
var ctdwntimer=angular.module('ctdwntimer',[]);

ctdwntimer.controller('ctdwnController',['$scope','$timeout','$interval',function($scope,$timeout,$interval){
    $scope.seconds=0;
    $scope.remsecs=0;
    $scope.remmillsecs=0;
    var stop1;
    var stop;
    
    $scope.setTime=function(sec){
        if(sec!==0)
        {  
            $scope.remmillsecs=(sec)*100;
            $scope.remsecs=$scope.remmillsecs/100;
            $scope.seconds=0;
        }
        $scope.startTimer();
    };
    
    $scope.startTimer=function(){
        stop=$interval(function(){
            if($scope.remmillsecs>0)
            {
                $scope.remmillsecs--;
                $scope.remsecs=$scope.remmillsecs/100;
            }
            else
                $scope.stopTimer();
        },10);
    };
    
    $scope.stopTimer=function(){
        if(angular.isDefined(stop))
        {
            $interval.cancel(stop);
            stop=undefined;
        }
    };
    
    $scope.$on('$destroy', function() {
        $scope.stopTimer();
    });
           
    
}]);
