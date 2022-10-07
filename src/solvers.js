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
  //PER THE SPEC:
  //skip 2 and 3, because there is no solution
  // if (n === 2 || n === 3) {
  //   return [[0, 0], [0, 0]];
  // }

  var board = new Board({n: n}) // creating a board n x n
  var solution = []; // solution which is an empty array
  if (n === 0 || n === 2 || n === 3) {
    for (var i = 0; i < n; i++) {
      var arr = [];
      while (arr.length < n) {
        arr.push(0)
      }
      solution.push(arr)
    }
    return solution;
  }


  //idea: if the board is 0, return 1;
  //board.attributes is the chessboard

//  var recurse = function (cnt) {
//   var row = cnt
//   if (cnt === n) {
//     return true;
//   }
//   for (var column = 0; column < n; column++) {
//     board.togglePiece(row, column)
//     cnt++

//     if (!board.hasAnyQueenConflictsOn(row, column)) {
//       if (recurse(cnt)) {
//         return true;
//       }
//     }
//     board.togglePiece(row, column);
//     cnt--
//   }
// }
// recurse(0)
// for (var j = 0; j < board.attributes.n; j++) {
//   solution.push(board.attributes[j]); // [[0, 0, 0, 0], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
// }
//solution.push(board.)


  // Each row should AT LEAST have 1 queen per line
    // If we reach to the end of the column and there's no queen, go back
    // and look for a different solution
  // Loop through each row and column
  // If there's


//deleteing one row===n-1, changing for else
  var cnt = 0;
  var recurse = function (rows, columns) {
    for (var i = columns; i < board.attributes[rows].length; i++) { // loop through each column
      board.togglePiece(rows, i) // toggle the piece
      cnt++;
      if (board.hasAnyQueensConflicts()) { // if there is a conflict then we want to toggle what we just toggled and move onto to the next col
        board.togglePiece(rows, i)
        cnt--;
        continue

      } else { // if there is no conflict then check the next row and column unless we're already on our row
        if (rows === n - 1 && cnt === n) { // && columns === n -
          return;
        }
        recurse(rows + 1, 0)
        if (cnt !== n) {
          board.togglePiece(rows, i) // if the recursive function does not work, it will kick back so we must toggle
          cnt--;
        }
      }
    }
  }
  recurse(0, 0)
  for (var j = 0; j < board.attributes.n; j++) {
    solution.push(board.attributes[j]); // [[0, 0, 0, 0], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  }



  // // var recBoard = function(board) {
  // for (var i = 0; i < n; i++) {  // Loop through the first row of the matrix
  //   //var row;
  //   board.togglePiece(0, i); // toggle the first row and increment each column
  //   if (n > 1) {
  //     var row = 1;
  //   } else {
  //     var row = 0;
  //   }
  //   var col = 0;
  //   while (board._isInBounds(row, col)) {
  //     if (row === n - 1 && col === n - 1) {
  //       for (var j = 0; j < board.attributes.n; j++) {
  //         solution.push(board.attributes[j]);
  //       }
  //       break;
  //     } else if (col === n - 1) {
  //       row++;
  //       col = 0;
  //     } else {
  //       col++;
  //     }

  //     board.togglePiece(row, col)
  //     if (board.hasAnyQueensConflicts()) {
  //       board.togglePiece(row, col);
  //     }
  //   }
  //   break;
  //   var board = new Board({n: n})
  // }
  // // }
  // //var solution = [[1]]; //fixme
  //console.log('queen solution ', solution)
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  if (n === 0) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }

  // loop through each row and column
  // toggle each piece
  // if there is conflict, untoggle
  // call the function until it reaches the last row
  //

  // var count = 0;
  // var recurse = function (rows, columns, cnt) {
  //   for (var i = columns; i < board.attributes[rows].length; i++) { // loop through each column
  //     board.togglePiece(rows, i) // toggle the piece
  //     cnt++;
  //     if (board.hasAnyQueensConflicts()) { // if there is a conflict then we want to toggle what we just toggled and move onto to the next col
  //       board.togglePiece(rows, i)
  //       cnt--;
  //       continue

  //     } else { // if there is no conflict then check the next row and column unless we're already on our row
  //       if (rows === n - 1 && cnt === n) { // && columns === n -
  //         solutionCount++;
  //         cnt--;
  //         console.log(board.attributes)
  //       } else {
  //         recurse(rows + 1, 0, cnt)
  //         if (cnt !== n) {
  //           board.togglePiece(rows, i) // if the recursive function does not work, it will kick back so we must toggle
  //           cnt--;
  //         }
  //       }
  //     }
  //   }
  // }
  // recurse(0, 0, count)


  //if n is 0; return 1 per spec;
  //if n is 2 or 3, then return 0; they can't be solved no matter how hard we try

  var recurse = function (row) {
    if (row === n) {
      solutionCount++;
      console.log(board.attributes)
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i)
      if (!board.hasAnyQueensConflicts()) {
        recurse(row + 1)
      }
      board.togglePiece(row, i)
    }
  }
  recurse(0);



  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
