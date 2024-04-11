import React from 'react';

const HowToPlayModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>How to Play</h2>
                <h3>Objective</h3>
                <p>Win scorecards by correctly predicting what each showcard will be just before you turn it up.</p>
                
                <h3>Cards</h3>
                <ul className='how-to-play-ul'>
                    <li>Game uses a 55-card pack with three Jokers.</li>
                    <li>Cards splited into two packs: 25 showcards (including one Joker, all Aces, Kings, Queens, Jacks, Tens, and Deuces) and 30 scorecards (including two Jokers and all numerals from Three to Nine).</li>
                    <li>Showcards are shuffled and dealt face down in a 5x5 grid.</li>
                    <li>Scorecards are stacked face down in a specific order from Threes at the bottom to Nines, then the two Jokers at the top.</li>
                </ul>

                <h3>Playing the Game</h3>
                <ul className='how-to-play-ul'>
                    <li>Players take turns to predict and reveal cards.</li>
                    <li>Points are scored based on the accuracy of predictions:</li>
                    <ul>
                        <li><strong>Suit match (different rank):</strong> Win 1 scorecard.</li>
                        <li><strong>Rank match (different suit):</strong> Win 2 scorecards.</li>
                        <li><strong>Exact match:</strong> Win 4 scorecards.</li>
                        <li><strong>Joker guess:</strong> Win 2 for a Deuce, 4 for a true Joker.</li>
                    </ul>
                    <li>Predictions for the last card to be turned up are made at the start. No two players can predict the same suit, rank, or a Joker.</li>
                </ul>

                <h3>End of Round</h3>
                <p>The round continues until only one card remains face down. The player who correctly predicted this card wins all remaining scorecards.</p>

                <h3>Scoring</h3>
                <ul className='how-to-play-ul'>
                    <li>Scorecards are collected in order from the scorecard pile as they are won.</li>
                    <li>Each player's score for the round is the total face values of all the scorecards they have won. Jokers count as 10 points each.</li>
                    <li>The game consists of as many deals as there are players, rotating the first player for each deal.</li>
                </ul>

                <h3>Special Rules</h3>
                <ul className='how-to-play-ul'>
                    <li>Players cannot call the same card as the previous player or a card that has already been turned or a Joker if all five have been faced.</li>
                    {/* <li>If a player mistakenly calls such a card, the first opponent to notice can claim the highest-valued scorecard from that player's won cards.</li> */}
                </ul>

                <h3>Game Objective</h3>
                <p>The first player to reach 173 points wins the game.</p>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default HowToPlayModal;
