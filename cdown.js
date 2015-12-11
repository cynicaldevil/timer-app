
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
    
    $scope.resetTimer=function(){
        
        currentCycle=undefined;
        if(angular.isUndefined(stop))                    //resets time only if timer is paused
        {
            $scope.stopTimer();
            $scope.remmillisecs=($scope.seconds)*100+($scope.milliseconds/10);
            $scope.remsecs=Math.floor($scope.remmillisecs/100);
        }
        else if(angular.isDefined(stop))                 //starts timer after resetting if timer is already running
        {
            $scope.stopTimer();
            $scope.setTime();
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
