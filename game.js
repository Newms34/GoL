function Conway(width, height) {
    //here's your board constructor. What's it gonna need? For starters, you'll probably need the board height and width
    //remember to use "this.myVar" to make the vars public!
    //this.width = width;

}

Conway.prototype.createAndShowBoard = function() {
    var board = document.querySelector('#board');
    // clear the board (a table element)
    board.innerHTML = '';

    //don't forget to clear the previous data from your Conway instance. 
    //Note that this doesn't mean you've gotta delete that instance!
    var simtable = document.createElement("tbody");
    //simtable - the newest in a long line of really unnecessary simulation games from Maxis™?

    // build Table HTML. A simple bunch of loops will work here.
    // Or, if you're feelin adventurous, feel free to use some angular!

    simtable.innerHTML = '';

    // add table to the #board element
    board.appendChild(simtable);

    //we've made our board. Now we need to make it interactive!
    this.setupBoardEvents();
};

Conway.prototype.setupBoardEvents = function() {
    /* setup the board. Among other things, you're gonna wanna determine:
    1) How you reference each cell
    2) How you toggle a cell
    */

    var onCellClick = function(e) {
        // How can we toggle the status of each cell when it's clicked?
    };


    for (var i = 0, len = this.boardCellArr.length; i < len; i++) {
        //apply that onCellClick to each cell! Note: Make SURE the onclicks are DIFFERENT, so clicking on cell (0,0) doesn't toggle cell (3,4)!
    }
    //don't forget to apply event listeners to your buttons!
    //document.querySelector('startBtn').onclick=someFunction();
};

Conway.prototype.step = function() {
    /*In the method, you're gonna need to determine what happens each time the board 'cycles'
    Each cycle will need to determine which cells live and which die.
    Rules:
     - Cells with 2 or fewer neighbors die (underpopulation)
     - Cells with 2 or 3 neighbors lives (if already alive)
     - Cells with more than 3 neighbors die (overpopulation)
     - Cells with exactly 3 neighbors that are currently dead are 'reborn'
    How can you search for an individual cell? Remember that DOM elements are 
    NOT the same as the objects created by the Conway Constructor, so you'll need to do some associations
    */
};

Conway.prototype.enableAutoPlay = function() {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
    // If you want, feel free to set diffent 'speeds' for the autoplay
};

Conway.prototype.clearMe = function() {
    //a way to clear the board!
};

Conway.prototype.randBoard = function() {
    //given a board of a certain size, randomly turn on and off all cells.
    //NOTE: due to the rules for when a cell is alive or dead, you're 
    //probably NOT going to want to give these cells a 50/50 chance (since
    //that would be way overcrowded!)
};

Conway.prototype.changeSpeed = function() {
    //Optional function: change how fast 'autoplay' runs.

};

var sim; //one instance of our board constructor!


function makeNew() {
    //make a new instance of the Conway constructor, and run all of our
    //setup functions.
}
