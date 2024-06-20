import React, { useState, useEffect, useRef } from "react";
import GamePiece from "./GamePiece";
import "../styleBubble.css";

const characterWidth = 65;
const characterHeight = 65;

const Game = () => {
  const [activePiece, setActivePiece] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [hirab, setHirab] = useState(true);
  const [onPressHint, setOnPressHint] = useState(false);
  const [numberHint, setNumberHint] = useState(2);
  const [bubbleTime, setBubbleTime] = useState(0);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const bubbleAudioRef = useRef(null);

  const canvasWidth = window.innerWidth * 433 / 1000 * 3 / 2;
  const canvasHeight = window.innerWidth * 243 / 1000 * 3 / 2;

  useEffect(() => {
    bubbleAudioRef.current = new Audio("./assetBubble/bg_music.mp3");
    bubbleAudioRef.current.loop = true;

    if (hirab) {
      initGamePieces();
    } else {
      initGamePiecesKata();
    }

    intervalRef.current = setInterval(updateGameArea, 20);

    return () => {
      clearInterval(intervalRef.current);
      bubbleAudioRef.current.pause();
    };
  }, []);

  const initGamePieces = () => {
    const charactertextarray = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo"];
    const initialBubbles = charactertextarray.map((char, index) => createBubble(`./assetBubble/${char}.png`));
    setBubbles(initialBubbles);
  };

  const initGamePiecesKata = () => {
    const charactertextarray = ["a", "ae", "b", "ch", "e", "eo", "eu", "g", "h", "i", "j", "kk", "kh", "m", "n", "ng", "o", "oe", "pp", "ph", "r", "s", "ss", "t", "tch", "tt", "th", "u", "ui", "wa", "wae", "we", "wi", "wuo", "ya", "yae", "ye", "yeo", "yo", "yu"];
    const initialBubbles = charactertextarray.map((char, index) => createBubble(`./assetBubble/korean/${char}.png`));
    setBubbles(initialBubbles);
  };

  const createBubble = (src) => {
    return {
      imageSrc: src,
      width: characterWidth,
      height: characterHeight,
      x: Math.random() * (canvasWidth - characterWidth),
      y: Math.random() * (canvasHeight - characterHeight),
      speedX: (Math.random() * 2) - 1,
      speedY: (Math.random() * 2) - 1,
    };
  };

  const updateGameArea = () => {
    setBubbleTime((prev) => prev + 1);

    if (activePiece >= 40) {
      endGame();
    }

    const updatedBubbles = bubbles.map((bubble, index) => {
      if (index < activePiece) return bubble;
      const newBubble = { ...bubble };
      if (onPressHint && index === activePiece) {
        newBubble.width = 120;
        newBubble.height = 120;
      } else {
        newBubble.width = characterWidth;
        newBubble.height = characterHeight;
      }
      newBubble.x += newBubble.speedX;
      newBubble.y += newBubble.speedY;

      if (newBubble.x <= 0 || newBubble.x >= canvasWidth - newBubble.width) {
        newBubble.speedX = -newBubble.speedX;
      }
      if (newBubble.y <= 0 || newBubble.y >= canvasHeight - newBubble.height) {
        newBubble.speedY = -newBubble.speedY;
      }

      return newBubble;
    });

    setBubbles(updatedBubbles);
  };

  const endGame = () => {
    clearInterval(intervalRef.current);
    bubbleAudioRef.current.pause();

    const winAudio = new Audio("./assetBubble/win_music.mp3");
    winAudio.play();

    alert("Congratulations! You've won the game!");
    window.location.reload();
  };

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const clickedBubble = bubbles[activePiece];
    if (
      mouseX >= clickedBubble.x &&
      mouseX <= clickedBubble.x + clickedBubble.width &&
      mouseY >= clickedBubble.y &&
      mouseY <= clickedBubble.y + clickedBubble.height
    ) {
      setActivePiece((prev) => prev + 1);
      setOnPressHint(false);
    }
  };

  const handleHint = () => {
    if (numberHint > 0) {
      setOnPressHint(true);
      setNumberHint((prev) => prev - 1);
    } else {
      alert("No hints left!");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m${remainingSeconds}s`;
  };

  const handleQuit = () => {
    window.location.reload();
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <div>
      <div
        ref={canvasRef}
        style={{
          width: canvasWidth,
          height: canvasHeight,
          position: "relative",
          background: "#f0f0f0",
          overflow: "hidden",
        }}
        onClick={handleCanvasClick}
      >
        {bubbles.map((bubble, index) => (
          <GamePiece
            key={index}
            imageSrc={bubble.imageSrc}
            width={bubble.width}
            height={bubble.height}
            x={bubble.x}
            y={bubble.y}
          />
        ))}
      </div>
      <button onClick={handleQuit}>Quit</button>
      <button onClick={handleHint}>Hint</button>
      <div>{formatTime(Math.floor(bubbleTime / 50))}</div>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default Game;
