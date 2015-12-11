
var ctdwntimer=angular.module('ctdwntimer',[]);

ctdwntimer.controller('ctdwnController',['$scope','$timeout','$interval',function($scope,$timeout,$interval){
    $scope.seconds=0;
    $scope.milliseconds=0;
    $scope.remsecs=0;
    $scope.remmillsecs=0;
    var currentCycle;
    var stop;
    
    $scope.$watch(function(){return [$scope.seconds,$scope.milliseconds];},function(){$scope.remsecs=$scope.seconds;
                                     $scope.remmillisecs=$scope.milliseconds/10;
                                    },true);
    
    $scope.setTime=function(){
        if(angular.isUndefined(currentCycle))
        {  
            $scope.remmillisecs=($scope.seconds)*100+($scope.milliseconds/10);
            $scope.remsecs=$scope.remmillisecs/100;
            //$scope.seconds=0;
            //$scope.milliseconds=0;
            console.log($scope.remmillisecs);
            currentCycle="running";
        }
        $scope.startTimer();
    };
    
    $scope.startTimer=function(){
        if(angular.isUndefined(stop))
        {
            
            stop=$interval(function(){
                if($scope.remmillisecs>0)
                {
                    $scope.remmillisecs--;
                    $scope.remsecs=Math.floor($scope.remmillisecs/100);
                }
                else
                {
                    $scope.stopTimer();
                    currentCycle=undefined;
                }
            },10);
        }
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


/*var stopwatch=angular.module("stopwatch",[]);
stopwatch.controller("stopwatchController",["$scope","$intreval",function($scope,$interval){
    $scope.mins=0;
    $scope.secs=0;
    $scope.millisecs=0;
    
    
}]);*/
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
