import React, { useState } from 'react'

const Algorithm = () => {

    const [myArray, setmyArray] = useState(new Array(9).fill(null).map(() => new Array(9).fill(null)));
    const [difficulty, setDifficulty] = useState(30);
    const [select, setSelect] = useState(false)
    const [level, setLevel] = useState("Easy")

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };

    const genBoard = () => {
        const board = new Array(9).fill(null).map(() => new Array(9).fill(null)); 
        if(fillSudoku(board)){
            removeNumbers(board)
            setmyArray(board); 
        }
      };

      const fillSudoku = (board) => {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (board[row][col] === null) {
              let nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
              for (let num of nums) {
                if (isSafe(board, row, col, num)) {
                  board[row][col] = num;
                  if (fillSudoku(board)) {
                    return true;
                  }
                  board[row][col] = null;
                }
              }
              return false;
            }
          }
        }
        return true;
      };
    const isSafe = (board, row, col, num)=>{
        for(let x = 0; x < 9; x++){
            if(
                board[row][x] === num || 
                board[x][col] === num ||  
                board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num)
                {
                    return false
            }  
        }
        return true
    }
    const removeNumbers = (board) => {
        let attempts = difficulty; // Number of cells to remove
        while (attempts > 0) {
          let row = Math.floor(Math.random() * 9);
          let col = Math.floor(Math.random() * 9);
          while (board[row][col] === null) {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
          }
          board[row][col] = null;
          attempts--;
        }
      };
    
      const handleInputChange = (row, col, value) => {
        const newArray = myArray.map((r, rowIndex) =>
          r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
        );
        setmyArray(newArray);
      };
   
      return (
        
        <div className='relative'>
            <div className=" mx-2">
                <h1 className='font-extrabold text-white text-center py-4 text-2xl'>SUDOKU</h1>
                </div>
          
          <div className="relative  flex justify-center items-center">
            <button onClick={()=> setSelect(!select)} className='bg-green-600 my-3 rounded-md lg:text-2xl px-2 py-2 text-white'>Select Difficulty</button>
          {select && (
            <div className='absolute top-full mt-2 w-48 bg-neutral-100 shadow-md flex flex-col'>
                <button onClick={()=>{
                    setDifficulty(30)
                    setSelect(!select)
                    setLevel("Easy")
                }} className='bg-green-600 w-full text-white rounded-md py-2 px-2'>Easy</button>
                <button onClick={()=>{
                    setDifficulty(40)
                    setSelect(!select)
                    setLevel("Medium")
                }}  className='bg-orange-600 text-white rounded-md py-2 px-2'>Medium</button>
                <button onClick={()=>{
                    setDifficulty(50)
                    setSelect(!select)
                    setLevel("Hard")
                }}  className='bg-red-600 w-full text-white rounded-md py-2 px-2'>Hard</button>
            </div>
          )}
          </div>
          {myArray.map((row, rowIndex) => (
            <div key={rowIndex} className="flex border-black justify-center items-center">
              {row.map((cellValue, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className={`${colIndex === 2  ? "border-r-black" : ""} ${rowIndex === 6  ? "border-t-black" : ""} ${rowIndex === 3  ? "border-t-black" : ""} ${colIndex === 5  ? "border-r-black" : ""} border font-extrabold text-lg flex items-center justify-center h-10 w-10 lg:w-14 lg:h-14`}>
                  <input
                    type="text"
                    value={cellValue === null ? '' : cellValue}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, parseInt(e.target.value, 10) || null)}
                    className="w-full h-full text-center"
                    maxLength="1"
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex text-2xl justify-center items-center ">
            <h2 className={`${level === "Easy" ? "text-green-600" : ""} ${level === "Medium" ? "text-orange-500" : ""} ${level === "Hard" ? "text-red-600" : ""}`}><b className='text-white'>Difficulty:</b> {level}</h2>
          </div>
          <div className="flex   justify-center items-center gap-2">
            <button className='bg-green-600 rounded-md lg:text-2xl my-3 px-2 py-2 text-white' onClick={genBoard}>Start</button>
            
          </div>
        </div>
      );
    };

export default Algorithm
