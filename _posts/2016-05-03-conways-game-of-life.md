---
layout: post
title: Conway’s Game of Life in JavaScript
---

<style type="text/css">
.gol__caption {
  text-transform: uppercase;
  font-weight: normal;
  text-align: left;
  color: hotpink;
  padding-bottom: 0.2em;
  border-bottom: 3px solid hotpink;
}

.gol__table {
  margin: 0 auto;
}

.gol__table td {
  padding: 0;
  background: #fff !important;
  border: 1px solid #ddd;
  width: 10px;
  height: 15px;
}

@media (max-width: 500px) {
  .gol__table td {
    height: 5px;
  }
}

.gol__table td.alive {
  background: hotpink !important;
}
</style>

<table class="gol__table">
  <caption class="gol__caption">Generation: <span id="generation"></span></caption>
  <tbody id="grid"></tbody>
</table>

<script src="https://code.jquery.com/jquery-2.1.4.js"></script>

<script>
$(function() {
  function GameOfLife(grid) {
    var self = this;

    this.generation = 0;
    this.generationEl = $('#generation');
    this.boardState = [];
    this.shouldContinue = true;
    this.el = $('#grid');

    grid.forEach(function(row, yPos) {
      var tr = $('<tr>');

      self.boardState.push(row.map(function(item, xPos) {
        var td = $('<td>'),
            tdId = 'x' + xPos + 'y' + yPos;

        td.attr('id', tdId);
        tr.append(td);
        self.el.append(tr);

        return {
          x: xPos,
          y: yPos,
          item: new Cell(item, td)
        };
      }));
    });

    this.updateGeneration();
  }

  GameOfLife.prototype.getSurroundingCells = function(x, y) {
    var surroundingCells = [],
        boardState = this.boardState,
        possibleSurroundingPositions = [
          {xPos: x - 1, yPos: y - 1},
          {xPos: x - 1, yPos: y},
          {xPos: x - 1, yPos: y + 1},
          {xPos: x, yPos: y - 1},
          {xPos: x, yPos: y + 1},
          {xPos: x + 1, yPos: y - 1},
          {xPos: x + 1, yPos: y},
          {xPos: x + 1, yPos: y + 1}
        ];

    possibleSurroundingPositions.forEach(function(coords) {
      if (boardState[coords.yPos] && boardState[coords.yPos][coords.xPos]) {
        surroundingCells.push(boardState[coords.yPos][coords.xPos]);
      }
    });

    return surroundingCells;
  };

  GameOfLife.prototype.setCellNextStates = function() {
    if (!this.shouldContinue) return;

    var self = this,
        boardState = this.boardState;

    boardState.forEach(function(row, yPos) {
      row.forEach(function(item, xPos) {
        var surroundingCells = self.getSurroundingCells(xPos, yPos),
            aliveCount = 0;

        surroundingCells.forEach(function(cell) {
          aliveCount += cell.item.getIsAlive();
        });

        if (aliveCount < 2) {
          item.item.nextState = 0;
        } else if (aliveCount === 2) {
          item.item.nextState = item.item.nextState;
        } else if (aliveCount === 3) {
          item.item.nextState = 1;
        } else {
          item.item.nextState = 0;
        }

      });
    });

    this.updateGeneration();
  };

  GameOfLife.prototype.updateGeneration = function() {
    var self = this;

    this.shouldContinue = false;

    this.boardState.forEach(function(row, index) {
      row.forEach(function(item, index) {
        if (item.item.nextState !== item.item.getIsAlive() || !self.generation) {
          self.shouldContinue = true;
        }

        item.item.setIsAlive(item.item.nextState);
      });
    });

    this.generationEl.text(this.generation);
    this.generation++;

    setTimeout(function() {
      self.setCellNextStates();
    }, 100);
  };


  function Cell(initialState, el) {
    this.el = el;
    this.nextState = initialState;
    this.setIsAlive(initialState);
  }

  Cell.prototype.getIsAlive = function() {
    return this.isAlive;
  };

  Cell.prototype.setIsAlive = function(value) {
    this.isAlive = value;

    if (value) {
      this.el.addClass('alive');  
    } else {
      this.el.removeClass('alive');
    }
  };

  function buildGrid(size) {
    var grid = [];

    for (var i = 0; i < size; i++) {
      var row = [];

      for (var j = 0; j < size; j++) {
        var startCondition = Math.round(Math.random() * 0.6);

        row.push(startCondition);
      }

      grid.push(row);
    }

    return grid;
  }

  var grid = buildGrid(50),
      gameOfLife = new GameOfLife(grid);
});

</script>

## Rules (from [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life))
0. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
0. Any live cell with two or three live neighbours lives on to the next generation.
0. Any live cell with more than three live neighbours dies, as if by over-population.
0. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## JavaScript
{% highlight js %}
function GameOfLife(grid) {
  var self = this;

  this.generation = 0;
  this.generationEl = $('#generation');
  this.boardState = [];
  this.shouldContinue = true;
  this.el = $('#grid');

  grid.forEach(function(row, yPos) {
    var tr = $('<tr>');

    self.boardState.push(row.map(function(item, xPos) {
      var td = $('<td>'),
          tdId = 'x' + xPos + 'y' + yPos;

      td.attr('id', tdId);
      tr.append(td);
      self.el.append(tr);

      return {
        x: xPos,
        y: yPos,
        item: new Cell(item, td)
      };
    }));
  });

  this.updateGeneration();
}

GameOfLife.prototype.getSurroundingCells = function(x, y) {
  var surroundingCells = [],
      boardState = this.boardState,
      possibleSurroundingPositions = [
        {xPos: x - 1, yPos: y - 1},
        {xPos: x - 1, yPos: y},
        {xPos: x - 1, yPos: y + 1},
        {xPos: x, yPos: y - 1},
        {xPos: x, yPos: y + 1},
        {xPos: x + 1, yPos: y - 1},
        {xPos: x + 1, yPos: y},
        {xPos: x + 1, yPos: y + 1}
      ];

  possibleSurroundingPositions.forEach(function(coords) {
    if (boardState[coords.yPos] && boardState[coords.yPos][coords.xPos]) {
      surroundingCells.push(boardState[coords.yPos][coords.xPos]);
    }
  });

  return surroundingCells;
};

GameOfLife.prototype.setCellNextStates = function() {
  if (!this.shouldContinue) return;

  var self = this,
      boardState = this.boardState;

  boardState.forEach(function(row, yPos) {
    row.forEach(function(item, xPos) {
      var surroundingCells = self.getSurroundingCells(xPos, yPos),
          aliveCount = 0;

      surroundingCells.forEach(function(cell) {
        aliveCount += cell.item.getIsAlive();
      });

      if (aliveCount < 2) {
        item.item.nextState = 0;
      } else if (aliveCount === 2) {
        item.item.nextState = item.item.nextState;
      } else if (aliveCount === 3) {
        item.item.nextState = 1;
      } else {
        item.item.nextState = 0;
      }

    });
  });

  this.updateGeneration();
};

GameOfLife.prototype.updateGeneration = function() {
  var self = this;

  this.shouldContinue = false;

  this.boardState.forEach(function(row, index) {
    row.forEach(function(item, index) {
      if (item.item.nextState !== item.item.getIsAlive() || !self.generation) {
        self.shouldContinue = true;
      }

      item.item.setIsAlive(item.item.nextState);
    });
  });

  this.generationEl.text(this.generation);
  this.generation++;

  setTimeout(function() {
    self.setCellNextStates();
  }, 100);
};


function Cell(initialState, el) {
  this.el = el;
  this.nextState = initialState;
  this.setIsAlive(initialState);
}

Cell.prototype.getIsAlive = function() {
  return this.isAlive;
};

Cell.prototype.setIsAlive = function(value) {
  this.isAlive = value;

  if (value) {
    this.el.addClass('alive');  
  } else {
    this.el.removeClass('alive');
  }
};

function buildGrid(size) {
  var grid = [];

  for (var i = 0; i < size; i++) {
    var row = [];

    for (var j = 0; j < size; j++) {
      var startCondition = Math.round(Math.random() * 0.6);

      row.push(startCondition);
    }

    grid.push(row);
  }

  return grid;
}

var grid = buildGrid(50),
    gameOfLife = new GameOfLife(grid);

{% endhighlight %}

## SCSS
{% highlight SCSS %}
.gol__caption {
  text-transform: uppercase;
  font-weight: normal;
  text-align: left;
  color: hotpink;
  padding-bottom: 0.2em;
  border-bottom: 3px solid hotpink;
}

.gol__table {
  margin: 0 auto;

  td {
    border: 1px solid #ddd;
    width: 10px;
    height: 10px;

    &.alive {
      background: hotpink;
    }
  }
}

{% endhighlight %}
