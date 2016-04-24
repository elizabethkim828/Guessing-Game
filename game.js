var gameOfLife = {
  width: 20,
  height: 20,
  stepInterval: null,

  createAndShowBoard: function () {
    // create <table> element
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
  },
  
  setupBoardEvents: function() {
    for (var h = 0; h < this.height; h++) {
      for (var w = 0; w < this.width; w++) {
        document.getElementById(w+'-'+h).onclick = function() {
          gameOfLife.toggle(this);
        }
      }
    }
    
    document.getElementById('step_btn').onclick = this.step; // 'this' = gameOfLife
    document.getElementById('play_btn').onclick = function() {
      if (this.classList.contains('paused')) {  // 'this' = button
        this.classList.remove('paused');
      } else {
        gameOfLife.enableAutoPlay();
      }; 
    };
    
    document.getElementById('pause_btn').onclick = function() {
      document.getElementById('play_btn').classList.add('paused');
    };

    document.getElementById('reset_btn').onclick = function() {
      for (var h = 0; h < gameOfLife.height; h++) {
        for (var w = 0; w < gameOfLife.width; w++) {
          if (Math.random(0,1) < 0.5) {
            gameOfLife.toggle(document.getElementById(w+'-'+h));
          }
        }
      }
    };

    document.getElementById('clear_btn').onclick = function() { location.reload(); };
  
  },

  toggle: function(cell) {
    if (cell.getAttribute('data-status') == 'dead') {
      cell.className = "alive";
      cell.setAttribute('data-status', 'alive');
    } else {
      cell.className = "dead";
      cell.setAttribute('data-status', 'dead');
    }
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    //cell.setupBoardEvents.onCellClick;
    var toggleQueue = [];

    for (var h = 0; h < gameOfLife.height; h++) {
      for (var w = 0; w < gameOfLife.width; w++) {
        var currCell = document.getElementById(w+'-'+h);
        var aliveCount = gameOfLife.aliveCount(w,h);
        if(currCell.getAttribute('data-status') == 'alive'){
          if (aliveCount < 2 || aliveCount > 3){
            toggleQueue.push(currCell);
          }
        } else {
          if (aliveCount === 3){
            toggleQueue.push(currCell);
          }
        }       
      }
    };
    
    toggleQueue.forEach(function(cell) {
      gameOfLife.toggle(cell);
    });

  },

  aliveCount: function(width, height) {
      var aliveCount = 0;
      for (var h = height-1; h < height+2; h++) {
        for (var w = width-1; w < width+2; w++) {
          if (document.getElementById(w+'-'+h) && !(w === width && h === height)) { /////// THIS IS TO ACCOUNT FOR BOX BOUNDARIES 
            currNeighbor = document.getElementById(w+'-'+h);
            if (currNeighbor.getAttribute('data-status') == 'alive') aliveCount++;
          }
        }
      }
      return aliveCount;
  },
  
  enableAutoPlay: function() {
    setInterval(function() {
      if (!document.getElementById('play_btn').classList.contains('paused')) { // classList is an array of class names
        gameOfLife.step();
      }
    }, 500);
  },
};

gameOfLife.createAndShowBoard();

