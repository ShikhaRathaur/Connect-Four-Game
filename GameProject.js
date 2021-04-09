var player1= prompt("Person One: Enter your name, your color will be Blue!");
var player1Color= 'rgb(86, 151, 255)';

var player2= prompt("Person Two: Enter your name, your color will be Red!");
var player2Color= 'rgb(237, 45, 73)';

var game_on= true;
var table= $('table tr');

function reportWin(rowNum,colNum){
  console.log("You won starting at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function reportColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport= reportColor(5,colIndex);
  for (var row = 5; row> -1; row--) {
    colorReport= reportColor(row,colIndex);
    if (colorReport=== 'rgb(128, 128, 128)') {
      return row;
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined);
}

function horizontalCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(reportColor(row,col), reportColor(row,col+1), reportColor(row,col+2), reportColor(row,col+3))){
        console.log('Horizontal');
        reportWin(row,col);
        return true;
      }
    }
  }
}

function verticalCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(reportColor(row,col), reportColor(row+1,col), reportColor(row+2,col), reportColor(row+3,col))){
        console.log('Vertical');
        reportWin(row,col);
        return true;
      }
    }
  }
}

function diagonalCheck() {
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 7; col++) {
      if (colorMatchCheck(reportColor(row,col), reportColor(row+1,col+1), reportColor(row+2,col+2), reportColor(row+3,col+3))){
        console.log('Diagonal');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(reportColor(row,col), reportColor(row-1,col+1), reportColor(row-2,col+2), reportColor(row-3,col+3))){
        console.log('Diagonal');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(reportColor(row,col), reportColor(row+1,col-1), reportColor(row+2,col-2), reportColor(row+3,col-3))){
        console.log('Diagonal');
        reportWin(row,col);
        return true;
      }
    }
  }
}

var currentPlayer= 1;
var currentPlayerName= player1;
var currentPlayerColor= player1Color;

$('h3').text(currentPlayerName+" it is your turn, pick a column to drop in!");

$('.board button').on('click', function() {
  var col= $(this).closest('td').index();
  var bottomAvailable= checkBottom(col);
  changeColor(bottomAvailable,col,currentPlayerColor);
  if (horizontalCheck()||verticalCheck()||diagonalCheck()) {
    $('h1').text(currentPlayerName+', You have won!')
    $('h2').fadeOut('fast');
    $('h3').fadeOut('fast');
  }
  currentPlayer=currentPlayer* -1;

  if (currentPlayer===1) {
    currentPlayerName= player1;
    $('h3').text(currentPlayerName+", it is your turn.");
    currentPlayerColor= player1Color;

  }else {
    currentPlayerName= player2;
    $('h3').text(currentPlayerName+", it is your turn.");
    currentPlayerColor= player2Color;
  }

})
