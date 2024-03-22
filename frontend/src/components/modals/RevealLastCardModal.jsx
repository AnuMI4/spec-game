const RevealLastCardModal = ({ isOpen, onClose, onReveal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Reveal Last Card</h2>
        <p>
          This is the last card! Click below to reveal it and finalize the
          round.
        </p>
        <button onClick={onReveal}>Reveal Card</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RevealLastCardModal;
