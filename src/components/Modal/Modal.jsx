function Modal({ isOpen, children, onClose }) {

  if (!isOpen) return null;

  return (
    <div>
      <div aria-label="modal" onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <div>
            <div>
              <button onClick={onClose}>CHIUDI</button>
            </div>
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
