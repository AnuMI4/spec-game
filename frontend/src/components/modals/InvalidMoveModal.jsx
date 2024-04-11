const InvalidMoveModal = ({ isOpen, onClose, lastGuessesArray }) => {
    const lastValue = lastGuessesArray.slice(-1)[0];
    const secondLastValue = lastGuessesArray.slice(-2, -1)[0];
    if (!isOpen) return null;
    const isSuitSame = lastValue.slice(-1) === secondLastValue.slice(-1);
    const isRankSame = lastValue.charAt(0) === secondLastValue.charAt(0);
    const modalText = (isSuitSame || isRankSame) ? 'Correct Call Out! You Win a ScoreCard!' : 'Incorrect Call out!';
  
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
            <h3>{modalText}</h3>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    );
  };
  
  export default InvalidMoveModal;
  