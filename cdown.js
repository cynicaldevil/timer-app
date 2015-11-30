
var ctdwntimer=angular.module('ctdwntimer',[]);

ctdwntimer.controller('ctdwnController',['$scope','$timeout','$interval',function($scope,$timeout,$interval){
    $scope.seconds=0;
    $scope.remsecs=0;
    $scope.remmillsecs=0;
    var stop1;
    var stop2;
    
    $scope.setTime=function(sec){
        if(sec!==0)
        {  
            //$scope.remsecs=sec-1;
            $scope.remmillsecs=(sec)*100;
            $scope.remsecs=$scope.remmillsecs/100;
            $scope.seconds=0;
        }
        $scope.startTimer();
    };
    
    $scope.startTimer=function(){
        //$scope.seconds=0;
        //$scope.remsecs=sec-1;
        //$scope.remmillsecs=(sec)*100;
        
        

            /*stop1=$interval(function(){
                if($scope.remsecs>0)
                    $scope.remsecs--;
            },1000);*/
        
        stop2=$interval(function(){
            if($scope.remmillsecs>0)
            {
                $scope.remmillsecs--;
                $scope.remsecs=$scope.remmillsecs/100;
            }
        },10);
    };
    
    $scope.stopTimer=function(){
        if(angular.isDefined(stop2))
        {
            //$interval.cancel(stop1);
            $interval.cancel(stop2);
            //stop1=undefined;
            stop2=undefined;
        }
    };
           
    
}]);
