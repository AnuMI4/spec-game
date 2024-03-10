import express from 'express';
import cors from 'cors';
import Game from "./Game.js";
import Card from "./Card.js";
import Grid from "./Grid.js";
import Guess from "./Guess.js";
import Points from "./Points.js"
import Players from "./Players.js";
import Helper from "./Helper.js";
const app = express();
const port = process.env.port || 3000;
const gameObject = new Game();
const cardObj = new Card();
const gridObj = new Grid();
const guessObj = new Guess();
const pointsObj = new Points();
const playersObj = new Players();

app.use(cors());

app.get('/getShowcards', (req, res) => {
    let deck = cardObj.createShowcardsDeck();
    cardObj.shuffleDeck(deck);
    res.send(deck);
});


app.listen(port, () => {
    console.log('server started on port '+port);
});