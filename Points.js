export default class Points {
    // Utility function to calculate points based on the prediction and the actual card
    calculatePoints(prediction, card) {
        let points = 0;
        const suitMatch = card.suit === prediction.suit;
        const valueMatch = card.value === prediction.value;
        if (suitMatch && !valueMatch) points += 1;
        if (valueMatch && !suitMatch) points += 2;
        if (suitMatch && valueMatch) points += 4;
        return points;
    }

    // Function to calculate total points from scorecards
    calculateTotalPoints(hand) {
        let totalPoints = 0;
        hand.forEach(card => {
            totalPoints += card.value === "Joker" ? 10 : parseInt(card.value);
        });
        return totalPoints;
    }

    // Function to award bonus to the player whose last card prediction is correct
    awardBonus() {
        let points = 0;
        const suitMatch = card.suit === prediction.suit;
        const valueMatch = card.value === prediction.value;
        isBonus = suitMatch && valueMatch || suitMatch && !valueMatch || !suitMatch && valueMatch;
    }
}