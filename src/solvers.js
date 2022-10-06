/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // find the solution, return the board
  //build it, return it

  // [[1]]
  // [[1 0], [0 1]]
  // [[0 1], [1 0]]



  var board = new Board({n: n}) // creating a board n x n
  var solution = []; // solution which is an empty array
  // var recBoard = function(board) {
  for (var i = 0; i < n; i++) {  // Loop through the first row of the matrix
    //var row;
    board.togglePiece(0, i); // toggle the first row and increment each column
    if (n > 1) {
      var row = 1;
    } else {
      var row = 0;
    }
    var col = 0;
    while (board._isInBounds(row, col)) {
      if (row === n - 1 && col === n - 1) {
        for (var j = 0; j < board.attributes.n; j++) {
          solution.push(board.attributes[j]);
        }
        break;
      } else if (col === n - 1) {
        row++;
        col = 0;
      } else {
        col++;
      }

      board.togglePiece(row, col)
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      }
    }
    break;
    var board = new Board({n: n})
  }
  // }
  //var solution = [[1]]; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //check the spec; it's a factorial function
  var solution = []; //fixme

  var factorial = function (x) {
    if (x === 0) {
      return 1;
    } else {
      return x * factorial(x - 1);
    }
  }

  return factorial(n);


  // var board = new Board({n: n})
  // var arr = [];
  // // var recBoard = function(board) {
  // for (var i = 0; i < n; i++) {  // Loop through the first row of the matrix
  //   board.togglePiece(0, i);
  //   if (n > 1) {
  //     var row = 1;
  //   } else {
  //     var row = 0;
  //   }
  //   var col = 0;
  //   while (board._isInBounds(row, col)) {
  //     if (row === n - 1 && col === n - 1) {
  //       for (var j = 0; j < board.attributes.n; j++) {
  //         arr.push(board.attributes[j]);
  //       }
  //       break;
  //     } else if (col === n - 1) {
  //       row++;
  //       col = 0;
  //     } else {
  //       col++;
  //     }

  //     board.togglePiece(row, col)
  //     if (board.hasAnyRooksConflicts()) {
  //       board.togglePiece(row, col);
  //     }
  //   }
  //   solution.push(arr)
  //   var board = new Board({n: n})
  // }

  // console.log('Number of solutions for ' + n + ' rooks:', solution.length);
  // return solution.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = []; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
