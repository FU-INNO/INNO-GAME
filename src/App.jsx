import React, { useState } from "react";
import Menu from "./components/Menu";
import Game from "./components/Game"; // Adjust the path if necessary

const App = () => {
  const [isGuide, setIsGuide] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // New state to manage game play

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleGuide = () => {
    setIsGuide((prev) => !prev);
  };

  const handleSetting = () => {
    setIsSetting((prev) => !prev);
  };

  return (
    <div>
      {isPlaying ? (
        <Game />
      ) : (
        <Menu
          onPlay={handlePlay}
          onGuide={handleGuide}
          onSetting={handleSetting}
          isGuide={isGuide}
          isSetting={isSetting}
        />
      )}
    </div>
  );
};

export default App;
