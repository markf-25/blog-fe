import styles from "./ConfirmDialog.module.css"

const ConfirmDialog = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onCancel} className={styles.cancelButton}>Annulla</button>
          <button onClick={onConfirm} className={styles.okButton}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;