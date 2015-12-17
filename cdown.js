
var clockApp=angular.module('clock-app',[]);


//controller for countdown timer
clockApp.controller('ctdwnController',['$scope','$timeout','$interval',function($scope,$timeout,$interval){
    $scope.clockState="Start";
    $scope.seconds=0;
    $scope.milliseconds=0;
    $scope.remsecs=0;
    $scope.remmillsecs=0;
    var currentCycle;
    $scope.stop;
    $scope.isDisabled=false;
    
    $scope.$watch(function(){return [$scope.seconds,$scope.milliseconds];},function(){$scope.remsecs=$scope.seconds;
                                     $scope.remmillisecs=$scope.milliseconds/10;
                                     currentCycle=undefined;                  //corner case: when time is changed after pausing
                                    },true);
    
    $scope.toggleStartStop=function(){                       //called to toggle Start/Stop state of clock
    if($scope.stop===undefined)
        $scope.setTime();
    else
        $scope.stopTimer(); 
    };
    
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
        if(angular.isUndefined($scope.stop))
        {
            $scope.clockState="Stop";
            $scope.isDisabled=true;                           //disables input for time when timer is running
            $scope.stop=$interval(function(){
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
        if(angular.isDefined($scope.stop))                          //input for time is enabled once clock is paused
        {
            $interval.cancel($scope.stop);
            $scope.stop=undefined;
            $scope.isDisabled=false;
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


//controller for stopwatch
clockApp.controller('stopwatchController',['$scope','$interval',function($scope,$interval){
    $scope.mins=0;
    $scope.secs=0;
    $scope.millisecs=0;
    $scope.timeSplitArray=[];
    $scope.lapArray=[];
    $scope.disableSplit=false;
    $scope.disableLap=false;
    $scope.stop;
    var countSplit=0;
    var countLap=0;
    
    $scope.toggleStartStop=function(){                          //called to toggle Start/Stop state of clock
        if($scope.stop===undefined)
            $scope.startClock();
        else
            $scope.stopClock();
        
    };
    
    $scope.startClock=function(){
        if(angular.isUndefined($scope.stop)){
            $scope.stop=$interval(function(){
                $scope.millisecs+=10;
                $scope.secs=Math.floor($scope.millisecs/1000);
                $scope.mins=Math.floor($scope.secs/60);
            },10);
            
        }
    };
    
    $scope.stopClock=function(){
        if(angular.isDefined($scope.stop)){
           $interval.cancel($scope.stop);
           $scope.stop=undefined;
        }
    };
    
    $scope.resetClock=function(){
        $scope.stopClock();
        $scope.millisecs=0;
        $scope.secs=0;
        $scope.mins=0;
        $scope.timeSplitArray=[];
        $scope.lapArray=[];
        $scope.disableLap=false;
        $scope.disableSplit=false;
        countSplit=0;
        countLap=0;
        console.log($scope.timeSplitArray);
    };
    
    $scope.splitTime=function(){
        if($scope.stop!==undefined&&$scope.lapArray.length===0)
        {
            $scope.disableLap=true;
            $scope.timeSplitArray.push({index:++countSplit,
                                        mins:$scope.mins,
                                        secs:$scope.secs,
                                        millisecs:$scope.millisecs
                                       });
        }

    };
    
    $scope.startNewLap=function()
    {
        if($scope.stop!==undefined&&$scope.timeSplitArray.length===0)
        {
            $scope.disableSplit=true;
            $scope.lapArray.push({index:++countLap,
                                  mins:$scope.mins,
                                  secs:$scope.secs,
                                  millisecs:$scope.millisecs
                                 });
            $scope.stopClock();
            $scope.mins=0;
            $scope.secs=0;
            $scope.millisecs=0;
            $scope.startClock();
        }    
    };         
    
    $scope.$on('$destroy', function() {
        $scope.stopTimer();
    });
    
    
}]);

//controller for alarm
clockApp.controller("alarmController",["$scope","$interval",function($scope,$interval){
    $scope.hours=0;
    $scope.minutes=0;
    var date=new Date;
    
    $scope.incrementHours=function(){
        $scope.hours=++$scope.hours>12?1:$scope.hours;
    };
    
    $scope.decrementHours=function(){
        $scope.hours=--$scope.hours<=0?12:$scope.hours;
    };
    
    $scope.incrementMinutes=function(){
        $scope.minutes=++$scope.minutes>=60?0:$scope.minutes;
    };
    
    $scope.decrementMinutes=function(){
        $scope.minutes=--$scope.minutes<=0?59:$scope.minutes;
    };
}]);
   
//filter for padding numbers with zeroes
clockApp.filter('padNumber',function(){
    return function(input,minDigits){                   //function concatenates required number of zeroes         
    var numLength=input.toString().length;              //from zeroesString to the number
    var output=input.toString();
    var zeroesString="00000000000000";
    if(numLength<minDigits)
        output=zeroesString.substring(0,minDigits-numLength)+output;
    
    return output;
    };
});

//filter for toggling button label of Start/Stop button
clockApp.filter('clockState',function(){
    return function(stop){
        if(stop===undefined)
            return 'Start';
        else
            return 'Stop';
    };
});

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
