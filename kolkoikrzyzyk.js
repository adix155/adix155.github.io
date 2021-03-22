var AIEnabled=false;
var FirstPlayerTurn=true;
var FirstPlayerSign = 'x';
var SecondPlayerSign='o';
var count = 0;
var blocked = true;

var board = [["","",""],["","",""],["","",""]];

function onload()
{
    document.getElementById("result").style.display = "none";
    document.getElementById("resetGame").style.display = "none";
}

function start()
{
    var data = [document.getElementsByName("players")[0].checked,
        document.getElementsByName("players")[1].checked,
        document.getElementsByName("sign")[0].checked,
        document.getElementsByName("sign")[1].checked];

    if((!data[0]&&!data[1])|| (!data[2]&&!data[3])){
        document.getElementById("result").style.display = "block";
        document.getElementById("result").style.color = "red";
        document.getElementById("result").innerText = "Błędne dane! Spróbuj jeszcze raz";
        return;
    }

    if(data[0]) AIEnabled=true;
    if(data[2]) FirstPlayerSign='o';
    if(data[2]) SecondPlayerSign='x';


    document.getElementById("startdiv").style.display = "none";
    blocked = false;
    document.getElementById("result").style.display = "block";
    actualSign = FirstPlayerSign;
    document.getElementById("result").style.color = "black";
    document.getElementById("result").innerText = "Ruch " + actualSign;

}

function executeMove(y, x){
    if (blocked) return;
    if(document.getElementById("gameField"+(3*y+x)).children[0].alt!==""){
        document.getElementById("result").innerText = "Pole już zajęte!";
        return;
    }
    if(FirstPlayerTurn) {
        document.getElementById("gameField"+(3*y+x)).children[0].src=FirstPlayerSign+".png";
        document.getElementById("gameField"+(3*y+x)).children[0].alt=FirstPlayerSign;
        board[y][x] = FirstPlayerSign;
        count++;
    }
    else {
        document.getElementById("gameField"+(3*y+x)).children[0].src=SecondPlayerSign+".png";
        document.getElementById("gameField"+(3*y+x)).children[0].alt=SecondPlayerSign;
        board[y][x] = SecondPlayerSign;
        count++;
    }

    if(checkVictoryCondition(y,x)){
        if(FirstPlayerTurn)
        {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "green";
            document.getElementById("result").innerText = "Wygrywa pierwszy gracz!";
            blocked = true;
            document.getElementById("resetGame").style.display = "block";
            return;
        }
        else
        {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "green";
            document.getElementById("result").innerText = "Wygrywa drugi gracz!";
            blocked = true;
            document.getElementById("resetGame").style.display = "block";
            return;
        }
    }

    if (count === 9)
    {
        document.getElementById("result").style.display = "block";
        document.getElementById("result").style.color = "red";
        document.getElementById("result").innerText = "Remis!";
        blocked = true;
        document.getElementById("resetGame").style.display = "block";
        return;
    }

    FirstPlayerTurn=!FirstPlayerTurn;

    if (actualSign === 'x')
    {
        actualSign = 'o';
        document.getElementById("result").innerText = "Ruch o";
    }
    else if (actualSign === 'o')
    {
        actualSign = 'x';
        document.getElementById("result").innerText = "Ruch x";
    }

    if (AIEnabled == true && !FirstPlayerTurn)
    {
        AIMove();
    }
}

function AIMove()
{
    do
    {
        var i = Math.floor(Math.random() * 3);
        var j = Math.floor(Math.random() * 3);
    } while (board[i][j] != "")
    executeMove(i, j);
}

function checkVictoryCondition(y,x){

    if(board[y][0]===board[y][1]&&board[y][1]===board[y][2])  return true;
    if(board[0][x]===board[1][x]&&board[1][x]===board[2][x])  return true;
    if(board[0][0]===board[1][1]&&board[1][1]===board[2][2]&&board[2][2]!=="") return true;
    if(board[0][2]===board[1][1]&&board[1][1]===board[2][0]&&board[2][2]!=="")  return true;

    return false;
}