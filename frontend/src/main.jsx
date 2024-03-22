import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * score card representation (first 2 jokers and then cards from 3 to 9 in descending order)
 * we wanna know which cards the player is scoring visually maybe on each side left and right we show the cards each player scored in a pile
 * when last card remains then their would be no guess but a modal to reveal the last card and then decide the scoring accordingly
 * we also want to implement the invalid move callout feature. that if the previous player repeated the same guess then it should not allow the next player to do the same. and the player who callsout then he receives 1 hightest card from the wrong player
 */
