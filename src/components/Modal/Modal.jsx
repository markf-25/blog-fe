import styles from "./Modal.module.css";

function Modal({ isOpen, children, onClose, header }) {
  if (!isOpen) return null;

  return (
    <div className={styles.content}>
      <div aria-label="modal" onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2>{header}</h2>
            <div>
              <button className={styles.closebutton} onClick={onClose}>
                x
              </button>
            </div>
            <div className={styles.children}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
