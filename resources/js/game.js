/**
 * @desc:
 *      Creates a new Game, keeping track of scores and timers
 *
 * @param:
 *       none
 *
 */

function Game(){
    this.play=undefined;
    this.gameScore=0;
    this.time="";
    
    this.start = function(){
        console.log("Start game.");
    }

    this.startTimer = function(){
        console.log("Start timer.");
    }
    
    this.timeCalculate = function(){
        console.log("Calculate time.");
    }

    this.stopTimer = function(){
        console.log("Stop timer.");
    }

    this.score = function(){
        console.log("Add Score.");
    }

    this.getScore = function(){
        return this.gameScore;
    }

    this.save = function(){
        console.log("Start game.");
    }

    this.resume = function(){
        console.log("Resume game.");
    }

    this.getTime = function(){
        return this.time;
    }

}


