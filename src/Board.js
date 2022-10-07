// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // var board = this.rows()
      var current = this.get(rowIndex);
      var count = 0;
      for (var i = 0; i < current.length; i++) {
        if (current[i] === 1) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      } else {
      return false; // fixme
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
       if (board[i][colIndex]) {
        count++;
       }
      }

      if (count > 1) {
        return true;
      } else {
      return false; // fixme
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      var board = this.rows();
      for (var i = 0; i < board.length; i++) { // loop through each row of matrix
        for (var j = 0; j < this.get(i).length; j++) { // loop through each element
          var cnt2 = 0; // count should set to 0 each time a new row is
          if (this.get(i)[j] === 1) {
            for (var k = 0; k < board.length; k++) {
              if (this.get(k)[j] === 1) {
                cnt2++;
              }
            }

            if (cnt2 > 1) {
              return true;
            }
          }
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // searchMajorDiagonal: function(rowIndex, colIndex, cnt) {
    //   if (rowIndex === 3 || colIndex === 3) {
    //     return cnt;
    //   }
    //   if (this.get(rowIndex)[colIndex] === 1) {
    //     cnt++;
    //   }
    //   return this.searchMajorDiagonal(rowIndex + 1, colIndex + 1, cnt);
    // },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var board = this.rows();
      var count = 0;
      var row = 0;
      var column = majorDiagonalColumnIndexAtFirstRow;
      while (this._isInBounds(row, column)) {
        if (board[column][row] === 1) {
          count++;
        }

        row++;
        column++;
      }

      if (count > 1) {
        return true;
      }

      var count = 0;
      var row = 0;
      var column = majorDiagonalColumnIndexAtFirstRow;
      while (this._isInBounds(row, column)) {
        if (board[row][column] === 1) {
          count++;
        }

        row++;
        column++;
      }

      if (count > 1) {
        return true;
      }
      return false;

      //var diagonal = this._getFirstRowColumnIndexForMajorDiagonalOn(this.get('n'));

      // _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      //   return colIndex - rowIndex;
      // },

      // _isInBounds: function(rowIndex, colIndex) {
      //   return (
      //     0 <= rowIndex && rowIndex < this.get('n') &&
      //     0 <= colIndex && colIndex < this.get('n')
      //   );
      // },

      //get through from TL to BR
      //reaches 3, hit outer wall and return something
      //row index, column index, count as input
      //return this.searchMajorDiagonal();

      // console.log(majorDiagonalColumnIndexAtFirstRow)
      // var subArray = [];
      // for (var i = 0; i < 4; i++) {
      //   subArray.push(this.get(i))
      // }
      // var count = 0;

      //check current index +1 to see if the conflict exists

      // for (var j = 0; j < 3; j++) {
      //   if (subArray[majorDiagonalColumnIndexAtFirstRow] ) {

      //   }
      // }

      // if (count > 1) {
      //   return true;
      // } else {
      // return false; // fixme
      // }



      //return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme


      // for (var i = 0; i < this.rows().length; i++) { // loop through each row of matrix
      //   for (var j = 0; j < this.get(i).length; j++) { // loop through each element
      //     if (this.get(i)[j] === 1) {
      //       for (var k = i + 1; k < this.rows().length; k++) {
      //         for (var x = j + 1; x < this.get(k).length; x++) {
      //           if (this.get(k)[x] === 1) {
      //             return true;
      //           }
      //         }
      //       }
      //     //   cnt = this.searchMajorDiagonal(i, j, cnt)
      //     }
      //   }
      // }
      // return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var board = this.rows();
      var count = 0;
      var row = 3;
      var column = minorDiagonalColumnIndexAtFirstRow;
      while (this._isInBounds(row, column)) {
        if (board[column][row] === 1) {
          count++;
        }

        row--;
        column++;
      }


      if (count > 1) {
        return true;
      }
      return false;

      // var board = this.rows();
      // console.log(board)
      // var count = 0;
      // var row = 0;
      // var column = minorDiagonalColumnIndexAtFirstRow;
      // console.log(column);
      // while (this._isInBounds(row, column)) {
      //   if (board[row][column] === 1) {
      //     count++;
      //   }

      //   row++;
      //   column--;
      // }

      // if (column > 0) {
      //   row = 2;
      //   while (this._isInBounds(row, column)) {
      //     if (board[row][column] === 1) {
      //       count++;
      //     }

      //     row--;
      //     column++;
      //   }
      // }

      // row = board.length - 1;
      // while (this._isInBounds(row, column)) {
      //   if (board[row][column] === 1) {
      //     count++;
      //   }

      //   row--;
      //   column++;
      // }

      // if (count > 1) {
      //   return true;
      // }

      // return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {


      var board = this.rows();
      //console.log(board)
      for (var i = 0; i < board.length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme

      // for (var i = 0; i < this.rows().length; i++) { // loop through each row of matrix
      //   for (var j = 0; j < this.get(i).length; j++) { // loop through each element
      //     if (this.get(i)[j] === 1) { // if the element is equal 1 then start diagonally move bottom left
      //       for (var k = i + 1; k < this.rows().length; k++) {  // move down 1 element
      //         for (var x = j - 1; x >= 0; x--) {  // move to the left 1 element
      //           if (this.get(k)[x] === 1) {
      //             return true;
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
