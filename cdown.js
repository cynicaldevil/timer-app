
var clockApp=angular.module('clock-app',['ngAnimate']);


//controller for countdown timer
clockApp.controller('ctdwnController',['$scope','$timeout','$interval',function($scope,$timeout,$interval){
    $scope.clockState="Start";
    $scope.minutes=0;
    $scope.remmins=0;
    $scope.seconds=0;
    $scope.remsecs=0;
    $scope.milliseconds=0;
    $scope.remmillsecs=0;
    var currentCycle;
    $scope.stop;
    $scope.isDisabled=false;

//handles mouse events
    var promise=undefined;
    $scope.mousedown=function(timeUnit,sign) {
        if(promise===undefined)
        {
            var func;
            if(timeUnit==='seconds')
            {
                func=function(){ $scope.changeSeconds(sign) };
            }
            else if(timeUnit==='millisecs')
            {
                func=function() { $scope.changeMillisecs(sign) };
            }
            else if(timeUnit==='minutes')
            {
                func=function() { $scope.changeMinutes(sign) };
            }

            promise=$interval(function() {
                func();
            },timeUnit==='millisecs'?20:100);
        }
    };

    $scope.mouseup= function() {
        if(promise!==undefined)
        {
            $interval.cancel(promise);
            promise=undefined;
        }
    };

    $scope.changeMinutes=function(sign) {
        if(sign==='+')
            $scope.minutes++;
        else if(sign==='-' && $scope.minutes>0)
            $scope.minutes--;
    };

    $scope.changeSeconds=function(sign) {
        if(sign==='+')
        {
            $scope.seconds++;
            $scope.seconds%=60;
        }
        else if(sign==='-')
        {
            $scope.seconds--;
            $scope.seconds+=60;
            $scope.seconds%=60;
        }
    };

    $scope.changeMillisecs=function(sign) {
        if(sign==='+')
        {
            $scope.milliseconds+=10;
            $scope.milliseconds%=1000;
        }
        else if(sign==='-')
            $scope.milliseconds-=10;
            $scope.milliseconds+=1000;
            $scope.milliseconds%=1000;
    };



    $scope.$watch(function(){return [$scope.minutes,$scope.seconds,$scope.milliseconds];},function(){
                                     $scope.remmins=$scope.minutes;
                                     $scope.remsecs=$scope.seconds;
                                     $scope.remmillisecs=$scope.milliseconds/10;
                                     currentCycle=undefined;                  //corner case: when time is changed after pausing
                                    },true);

    $scope.toggleStartStop=function(){                       //called to toggle Start/Stop state of clock
    if(angular.isUndefined($scope.stop))
        $scope.setTime();
    else
        $scope.stopTimer();
    };

    $scope.setTime=function(){
        if(angular.isUndefined(currentCycle))
        {
            $scope.remmillisecs=($scope.minutes)*100*60 + ($scope.seconds)*100 + ($scope.milliseconds/10);
            $scope.remsecs=($scope.remmillisecs/100)%60;
            $scope.remmmins=$scope.remsecs/(60*100);
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
                    $scope.remsecs=Math.floor(($scope.remmillisecs/100)%60);
                    $scope.remmins=Math.floor($scope.remmillisecs/(60*100));
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
            $scope.remmillisecs=($scope.minutes)*100*60 + ($scope.seconds)*100 + ($scope.milliseconds/10);
            $scope.remsecs=Math.floor($scope.remmillisecs/100)%60;
            $scope.remmins=Math.floor($scope.remmillisecs/(60*100))%(60*100);
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
clockApp.controller("alarmController",["$scope","$interval","$timeout","$filter",function($scope,$interval,$timeout,$filter){
    $scope.hours=12;
    $scope.minutes=0;
    $scope.dayPeriod="AM";
    $scope.date=$filter('date')(new Date(),'mediumTime');
    $scope.alarms=[];
    $scope.setTime={};
    $scope.currentTime={};
    var totalSetTimeMins;
    var totalCurrentTimeMins;
    var timeDiff;
    var countAlarms=0;

    $interval(function(){
        $scope.date=$filter('date')(new Date(),'mediumTime');
    },1000);

    var promise;
    $scope.mousedown=function(timeUnit, sign) {
        if(promise==undefined)
        {
            var func;
            if(timeUnit==="hours")
            {
                if(sign==="+")
                    func=function() {$scope.incrementHours() };
                else if(sign==='-')
                    func=function() {$scope.decrementHours() };
            }
            else if(timeUnit==="minutes")
            {
                if(sign==='+')
                    func= function() {$scope.incrementMinutes() };
                else if(sign==='-')
                    func= function() {$scope.decrementMinutes() };
            }
            else if(timeUnit==="dayPeriod")
                func= function() {$scope.toggleDayPeriod() };

            promise=$interval(function(){
                func();
            },100);
        }
    };

    $scope.mouseup=function(){
        if(promise!==undefined)
        {
            $interval.cancel(promise);
            promise=undefined;
        }
    };

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

    $scope.toggleDayPeriod=function(){
        $scope.dayPeriod=$scope.dayPeriod==="AM"?"PM":"AM";
    };

    $scope.toggleCancelSet=function(alarm){
          if(angular.isDefined(alarm.stop))
              $scope.cancelAlarm(alarm);
          else
              $scope.setAlarm(alarm);
    };

    $scope.setAlarm=function(alarm){
        if(angular.isUndefined(alarm))                     //case when new alarm is set
        {
            $scope.setTime={hours:$scope.hours,
                    mins:$scope.minutes
                   };

            $scope.setTime.hours%=12;                    //converting from 12 hour
            if($scope.dayPeriod==="PM")                  //to a
                $scope.setTime.hours+=12;                //24 hour format
        }
        else                                        //case when an alarm is restarted
        {
            $scope.setTime=alarm.setTime;
            //console.log($scope.setTime.hours);
        }

        $scope.currentTime={hours:new Date().getHours(),
                            mins:new Date().getMinutes(),
                            secs:new Date().getSeconds(),
                            millisecs:new Date().getMilliseconds(),
                            };
        totalCurrentTimeMins=$scope.currentTime.hours*60+$scope.currentTime.mins;
        totalSetTimeMins=$scope.setTime.hours*60+$scope.setTime.mins;
        timeDiff=((24*60)+totalSetTimeMins-totalCurrentTimeMins-1)%(24*60);

        if(angular.isUndefined(alarm))
        {
            //console.log("gstd");
            var alarm={index:++countAlarms,           //insert new alarm object into 'alarms' array
                       timeDiff:timeDiff,
                       setTime:$scope.setTime};

            alarm.stop=$timeout(function(){
                           console.log("ALARM! #"+alarm.index);
                           $scope.cancelAlarm(alarm)
                       },((timeDiff+1)*60-$scope.currentTime.secs)*1000-$scope.currentTime.millisecs);

            $scope.alarms.push(alarm);
        }
        else
        {
              if(angular.isUndefined(alarm.stop))
              {
                  alarm.timeDiff=timeDiff;
                  alarm.stop=$timeout(function(){
                      console.log("ALARM! #"+alarm.index);
                      $scope.cancelAlarm(alarm)
                      },((alarm.timeDiff+1)*60-$scope.currentTime.secs)*1000-$scope.currentTime.millisecs);
              }
        }


        console.log("Alarm #"+$scope.alarms[$scope.alarms.length-1].index+" has been set for "+timeString(alarm.timeDiff)+" from now");
        //$scope.alarms.sort(function(a,b){return a.timeDiff-b.timeDiff});

    };

    $scope.cancelAlarm=function(alarm){

          if(angular.isDefined(alarm.stop))
          {
              //console.log("sdg");
               $timeout.cancel(alarm.stop);
               alarm.stop=undefined;
                console.log("Alarm #"+alarm.index+" with timeDiff "+timeString(alarm.timeDiff)+" has been cancelled");
          }
    };

    $scope.deleteAlarm=function($index){

        console.log("$index:"+$index);
        var alarmarr=$scope.alarms.splice($index,1);
        var alarm=alarmarr[0];
        console.log("alarm"+alarm);
        $timeout.cancel(alarm.stop);
        console.log("Alarm #"+alarm.index+" with timeDiff "+timeString(alarm.timeDiff)+" has been deleted");
        if($scope.alarms.length===0)
            countAlarms=0;
    };

    var timeString=function(timeDiff)
    {
        if(timeDiff===0)
            return "less than a minute";
        else {
            return (Math.floor(timeDiff/60)+" hours and "+timeDiff%60+" minutes");
        }
    };

    $scope.$on('$destroy', function()
    {
        for(alarm of $scope.alarms)
            $scope.cancel(alarm.stop);
    });


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

//filter for toggling button label of individual button alarm for cancel/restart
clockApp.filter('alarmState',function(){
    return function(stop){
        if(stop===undefined)
            return "RESTART";
        else
            return "CANCEL";
    }
});

//filter for rounding off and converting 24 hr time to 12 hr time
clockApp.filter('formatHours',function(){
    return function(input){
        input= Math.floor(input);
        input=(input===12||input===0)?12:input%12;
        return input;
    }
});

//animation module
// clockApp.animation('.output', function() {
//   return {
//     // enter : function(element, done) {
//     //   console.log("qwert");
//     //   element.css('opacity',0);
//     //   jQuery(element).animate({
//     //     opacity:1
//     //   }, done);
//
//     // enter : function(element,done) {
//     //       console.log("qwervt");
//     //     var output=jQuery('#stopwatch .content .output');
//     //     output.css('top', '0px');
//     //     jQuery(output).animate({
//     //         top: '50px'
//     //     },done);
//
//
//
//       // optional onDone or onCancel callback
//       // function to handle any post-animation
//       // cleanup operations
//       return function(isCancelled) {
//         if(isCancelled) {
//           jQuery(element).stop();
//         }
//       }
//     },
//     leave : function(element, done) {
//       element.css('opacity', 1);
//       jQuery(element).animate({
//         opacity: 0
//       }, done);
//
//       // optional onDone or onCancel callback
//       // function to handle any post-animation
//       // cleanup operations
//       return function(isCancelled) {
//         if(isCancelled) {
//           jQuery(element).stop();
//         }
//       }
//     },
//     move : function(element, done) {
//       element.css('opacity', 0);
//       jQuery(element).animate({
//         opacity: 1
//       }, done);
//
//       // optional onDone or onCancel callback
//       // function to handle any post-animation
//       // cleanup operations
//       return function(isCancelled) {
//         if(isCancelled) {
//           jQuery(element).stop();
//         }
//       }
//     },
//
//     // you can also capture these animation events
//     addClass : function(element, className, done) {},
//     removeClass : function(element, className, done) {}
//   }
// });
