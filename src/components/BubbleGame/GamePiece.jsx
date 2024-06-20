import React from "react";
import "../styleBubble.css";

const characterWidth = 65;
const characterHeight = 65;

const GamePiece = ({ imageSrc, width, height, x, y }) => {
  return (
    <img
      src={imageSrc}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
      }}
      alt=""
    />
  );
};

export default GamePiece;
