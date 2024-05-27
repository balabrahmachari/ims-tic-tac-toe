import React, { useState } from 'react'
// import Tabs from './comp/Tabs'
import "./App.css"
import TodoApp from './comp/TodoApp'
import Demo1 from './comp/Demo1'

export const App = () => {

  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('B');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [popup, setPopup] = useState(false);

  const handleButtonClick = (index) => {
    if (gameOver) return;
    if (board[index] !== '') return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWin();
    setCurrentPlayer(currentPlayer === 'B' ? 'L' : 'B');
  };

  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameOver(true);
        setWinner(board[a]);
        setPopup(true);
        return;
      }
    }
    if (!board.includes('')) {
      setGameOver(true);
      setPopup(true);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('B');
    setGameOver(false);
    setWinner(null);
    setPopup(false);
  };

  const handleNewGame = () => {
    handleReset();
  };
  return (
     <div className="wrap">
      <div className="cont">
        {board.map((value, index) => (
          <button key={index} className="btn" onClick={() => handleButtonClick(index)}>
            {value}
          </button>
        ))}
      </div>
      <button className="rs" onClick={handleReset}>
        Reset
      </button>
      {popup && (
        <div className="pop">
          <p className="p">{winner ? `Winner: ${winner}` : 'It\'s a draw!'}</p>
          <button className="ng" onClick={handleNewGame}>
            reset
          </button>
        </div>
      )}
    
    </div>
  )
}
