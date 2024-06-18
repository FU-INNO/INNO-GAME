import React from "react";
import Key from "../Key/Key";
import { useSelector, useDispatch } from "react-redux";
import { decPos, incRow, setBoard, incPos } from "../../redux/BoardSlice";
import wordList from "../../words.json";

const rows = ["q w e r t y u i o p", "a s d f g h j k l", "z x c v b n m"];

const keyMap = {
  q: "ㅂ",
  w: "ㅈ",
  e: "ㄷ",
  r: "ㄱ",
  t: "ㅅ",
  y: "ㅛ",
  u: "ㅕ",
  i: "ㅑ",
  o: "ㅐ",
  p: "ㅔ",
  a: "ㅁ",
  s: "ㄴ",
  d: "ㅇ",
  f: "ㄹ",
  g: "ㅎ",
  h: "ㅗ",
  j: "ㅓ",
  k: "ㅏ",
  l: "ㅣ",
  z: "ㅋ",
  x: "ㅌ",
  c: "ㅊ",
  v: "ㅍ",
  b: "ㅠ",
  n: "ㅜ",
  m: "ㅡ",
};

const Keyboard = () => {
  const position = useSelector((state) => state.board.pos);
  const board = useSelector((state) => state.board.board);
  const row = useSelector((state) => state.board.row);
  const correctWord = useSelector((state) => state.board.correctWord);
  const dispatch = useDispatch();

  let allWords = wordList.words;
  let board5Words = `${board[position - 5]}${board[position - 4]}${
    board[position - 3]
  }${board[position - 2]}${board[position - 1]}`.toLowerCase();

  const clickBack = () => {
    if (Math.floor((position - 1) / 5) < row) return;
    const newBoard = [...board];
    newBoard[position - 1] = "";
    dispatch(decPos());
    dispatch(setBoard(newBoard));
  };

  const clickEnter = () => {
    console.log("correct:", correctWord);
    if (!allWords.includes(board5Words)) {
      alert("Invalid word");
      return;
    }
    if (position % 5 === 0 && position !== 0) {
      dispatch(incRow());
    }
    if (position === 30 && allWords.includes(board5Words)) {
      alert("The word is: " + correctWord);
    }
  };

  const handleClick = (letter) => {
    if (position >= 30) return;
    const newBoard = [...board];
    newBoard[position] = keyMap[letter];
    dispatch(setBoard(newBoard));
    dispatch(incPos());
  };

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div className="flex justify-center text-center" key={rowIndex}>
          {rowIndex === 2 && (
            <span className="flex items-center" onClick={clickEnter}>
              Enter
            </span>
          )}
          {row.split(" ").map((letter, letterIndex) => (
            <div className="flex items-center" key={letterIndex}>
              <Key
                letter={keyMap[letter]}
                onClick={() => handleClick(letter)}
              />
              {letter === "m" && <span onClick={clickBack}>Delete</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
