const ExitConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Exit Game</h2>
        <p>
          Are you sure you want to exit the game? All progress will be lost.
        </p>
        <button onClick={onConfirm}>Yes, Exit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;
