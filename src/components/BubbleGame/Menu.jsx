import React from "react";
import "../styleBubble.css";

const Menu = ({ onPlay, onGuide, onSetting, isGuide, isSetting }) => {
  console.log("Menu component rendered");
  console.log("isGuide:", isGuide, "isSetting:", isSetting);

  return (
    <div id="menu">
      <button onClick={onPlay} className="buttonbubble" id="play">Play</button>
      <button onClick={onSetting} className="buttonbubble" id="setting">Setting</button>
      <button onClick={onGuide} className="buttonbubble" id="guide">Guide</button>
      <button className="buttonbubble" id="quit">Quit</button>

      {isSetting && (
        <div id="settingtableb" className="tableb">
          <button className="backbuttonb" onClick={onSetting}>&#11178; Back</button>
          <p>Setting</p>
          <div className="settinglineb">
            Type:
            <input type="radio" id="settinghirab" defaultChecked={true} name="table" />
            <label htmlFor="settinghirab">Hiragana&nbsp;&nbsp;</label>
            <input type="radio" id="settingkatab" name="table" />
            <label htmlFor="settingkatab">Katakana</label>
          </div>
        </div>
      )}

      {isGuide && (
        <div id="guidetableb" className="tableb">
          <button className="backbuttonb" onClick={onGuide}>&#11178; Back</button>
          <h4>Guide</h4>
          <p><br />Break the bubbles and win by finding and clicking on the letters in the bubbles as required.<br /><br /> You have 2 hints only each game.</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
