
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
            $scope.stopTimer();
            $scope.remmillisecs=($scope.seconds)*100+($scope.milliseconds/10);
            $scope.remsecs=Math.floor($scope.remmillisecs/100);
            
    };
    
    $scope.$on('$destroy', function() {
        $scope.stopTimer();
    });
    
    
    

           
}]);


var stopwatch=angular.module('stopwatch',[]);
stopwatch.controller('stopwatchController',['$scope','$interval',function($scope,$interval){
    console.log("SDGFSDGFHF");
    $scope.mins=0;
    $scope.secs=0;
    $scope.millisecs=0;
    var stop;
    
    $scope.startClock=function(){
        console.log("grsgtgd");
        if(angular.isUndefined(stop)){
            
            stop=$interval(function(){
                $scope.millisecs+=10;
                $scope.secs=Math.floor($scope.millisecs/1000);
                $scope.mins=Math.floor($scope.secs/60);
            },10);
            
        }
    };
    
    $scope.stopClock=function(){
        if(angular.isDefined(stop)){
           $interval.cancel(stop);
           stop=undefined;
        }
    };
    
    $scope.resetClock=function(){
        $scope.stopClock();
        $scope.millisecs=0;
        $scope.secs=0;
        $scope.mins=0;
    };
    
    $scope.$on('$destroy', function() {
        $scope.stopTimer();
    });
    
    
}]);

angular.element(document).ready(function() {             //manually bootstrapping second ng-app             
    
    angular.bootstrap(document.getElementById("stopwatch"),["stopwatch"]);
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
