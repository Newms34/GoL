
function GameOfLife(width,height) {
  this.width = width;
  this.height = height;
  this.boardCellArr = [];
  this.cellStatus=[];
  this.cellSinceDeath=[];
  this.Running = false;
  this.timerFunc;
  this.spd=300;
  this.loadFileLength;
  this.loadFile='';
  this.loadFileSkip;
}

GameOfLife.prototype.createAndShowBoard = function () {
  // create <table> element
  document.getElementById('board').innerHTML = '';
  this.cellStatus = [];
  this.boardCellArr = [];
  var goltable = document.createElement("tbody");
  
  // build Table HTML
  var tablehtml = '';
  for (var h=0; h<this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w<this.width; w++) {
      tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
    }
    tablehtml += "</tr>";
  }
  goltable.innerHTML = tablehtml;
  
  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(goltable);
  
  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};

GameOfLife.prototype.setupBoardEvents = function() {
  // each board cell has an CSS id in the format of: "x-y" 
  // where x is the x-coordinate and y the y-coordinate
  // use this fact to loop through all the ids and assign
  // them "on-click" events that allow a user to click on 
  // cells to setup the initial state of the game
  // before clicking "Step" or "Auto-Play"
  
  // clicking on a cell should toggle the cell between "alive" & "dead"
  // for ex: an "alive" cell be colored "blue", a dead cell could stay white
  
  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event on just the 0-0 cell
  // You need to add the click event on EVERY cell on the board
  

  var onCellClick = function (e) {
    // coordinates of cell, in case you need them
    document.getElementById('clearBt').disabled=false;
    var coord_array = this.id.split('-');
    var coord_hash = {x: coord_array[0], y: coord_array[1]};
    
    var test=coord_array.join('-');
    var pos = gol.boardCellArr.indexOf(coord_array.join('-'));

    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      this.className = "alive";
      this.setAttribute('data-status', 'alive');
      gol.cellStatus[pos]=1;
    } else {
      this.className = "dead";
      this.setAttribute('data-status', 'dead');
      gol.cellStatus[pos]=0;
    }
  };


 for (var x = 0; x < this.width; x++) {
   for (var y=0; y < this.height; y++) {
     this.boardCellArr.push(document.getElementById(x + "-" + y).id);
     this.cellStatus.push(0);
     this.cellSinceDeath.push(50);
   }
 }

 for (var i = 0, len = this.boardCellArr.length; i < len; i++) {
   document.getElementById(this.boardCellArr[i]).onclick = onCellClick;
 }

  
};

GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game
  for (var n=0;n<this.boardCellArr.length;n++){
    var liveness=0;
    for (var x=-1;x<=1;x++){
      for(var y=-1;y<=1;y++){
        //do columns first, then rows.
        if (x==0 && y ==0){
          //same cell: do nothing
        }
        else{
          var currCellArr= this.boardCellArr[n].split('-');
          currCellArr[0] = parseInt(currCellArr[0])+x;
          currCellArr[1] = parseInt(currCellArr[1])+y;
          var cellToCheck = currCellArr[0]  + '-' + currCellArr[1] ;
          if (document.getElementById(cellToCheck) && document.getElementById(cellToCheck).className == 'alive'){
            liveness++;
          }
        }
      }
    }
    //check to see if cell gets to live or not
    if (this.cellStatus[n]==1 && (liveness <2 || liveness >3)){
      this.cellStatus[n]=0;
    }
    else if (this.cellStatus[n]==0 && liveness ==3){
      this.cellStatus[n] = 1;
    }
    else {
      this.cellStatus[n] = this.cellStatus[n];
    }

  }
  for (var u=0;u<this.cellStatus.length;u++){
    var cellToChange;
    var lum = Math.max(0,(50-this.cellSinceDeath[u])-5);
    var hue = Math.max(0,(-1.5 *this.cellSinceDeath[u])+60);
    if (this.cellStatus[u]==1){
      cellToChange = document.getElementById(this.boardCellArr[u]);
      cellToChange.setAttribute('data-status','alive');
      cellToChange.className = 'alive';
      this.cellSinceDeath[u]=0;
      
      //cellToChange.style.backgroundColor='#fff';
    }
    else {
      cellToChange = document.getElementById(this.boardCellArr[u]);
      cellToChange.setAttribute('data-status','dead');
      cellToChange.className = 'dead';
      if (this.cellSinceDeath[u]<100) {
        this.cellSinceDeath[u]++;
      }
      cellToChange.style.backgroundColor='hsl('+hue+',100%,'+lum+'%)';
    }
  }
  
};

GameOfLife.prototype.enableAutoPlay = function () {
  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval
  if (this.Running){
    //game already running, turn off!
    document.getElementById('playBt').innerHTML = 'Play';
    this.Running = false;
    clearInterval(this.timerFunc);
  }
  else {
    //not already running: start the 'game'!
    document.getElementById('playBt').innerHTML = 'Pause';
    this.Running = true;
    this.timerFunc = setInterval(function(){gol.step()},300);
  }
};

GameOfLife.prototype.clearMe = function() {
  for (var n=0;n<this.cellStatus.length;n++){
    this.cellStatus[n] ==0;
    var cellToChange = document.getElementById(this.boardCellArr[n]);
    cellToChange.setAttribute('data-status','dead');
    cellToChange.className = 'dead';
    clearInterval(this.timerFunc);
    document.getElementById('clearBt').disabled = true;
  }
};

GameOfLife.prototype.randBoard = function() {
  for (var n=0;n<this.cellStatus.length;n++){
    var onOrOff= Math.floor(Math.random()*5);
    if (!onOrOff){
      this.cellStatus[n] ==1;
      var cellToChange = document.getElementById(this.boardCellArr[n]);
      cellToChange.setAttribute('data-status','alive');
      cellToChange.className = 'alive';
    } 
    else {
      this.cellStatus[n] ==0;
      var cellToChange = document.getElementById(this.boardCellArr[n]);
      cellToChange.setAttribute('data-status','dead');
      cellToChange.className = 'dead';
    }
  }
};

GameOfLife.prototype.changeSpeed = function() {
  if (this.spd == 300){
    this.spd = 200;
    document.getElementById('playSpd').innerHTML = 'Switch to Fast';
  }
  else if (this.spd == 200){
    document.getElementById('playSpd').innerHTML = 'Switch to Slow';
    this.spd = 100;
  }
  else {
    document.getElementById('playSpd').innerHTML = 'Switch to Medium';
    this.spd = 300;
  }
    clearInterval(this.timerFunc);
    this.timerFunc = setInterval(function(){gol.step()},this.spd);
    
};

GameOfLife.prototype.loadPreset = function(){
this.clearMe();
document.getElementById('clearBt').disabled=false;
this.loadFile = document.getElementById('loadTarg').value.split('|');
this.loadFileLength = this.loadFile[0].length;
if (this.loadFileLength<=this.width && this.loadFile.length<= this.height){
  this.loadFileSkip = this.width-this.loadFileLength;//this will be the number to skip in cellStatus
  var currCellNum=0;
  for (var y=0;y<this.loadFile.length;y++){
    for (var x=0;x<this.loadFileLength;x++){
      if(this.loadFile[y][x] == 'O'){
        //cell LIVES!
        this.cellStatus[currCellNum] =1;
        var cellToChange = document.getElementById(this.boardCellArr[currCellNum]);
        cellToChange.setAttribute('data-status','alive');
        cellToChange.className = 'alive';
      }
      else {
        this.cellStatus[currCellNum] =0;
        var cellToChange = document.getElementById(this.boardCellArr[currCellNum]);
        cellToChange.setAttribute('data-status','dead');
        cellToChange.className = 'dead';
      }
      currCellNum++;
    }
    currCellNum += this.loadFileSkip;
  }
  console.log(this.cellStatus);
}
else {
  alert ('The board is too small for your pattern!');
}
};

var gol;


function makeNew(){
  var x = parseInt(document.getElementById('xVal').value);
  var y = parseInt(document.getElementById('yVal').value);
  gol = new GameOfLife(x,y)
  gol.createAndShowBoard();
  document.getElementById('gameTi').innerHTML = 'Game of Life ('+x+' by '+y+')';
}
