import Modal from "../../Modal/Modal.jsx";

import Input from "../../Input/Input.jsx";

import styles from "../AuthModal/AuthModal.module.css";

import useInput from "../../../hooks/useInput.js";


const CommentModal = ({ isOpen, onClose, existingComment }) => {

    const {value: commentValue, handleChange: handleCommentChange} = useInput("")

  return <>
      <form onSubmit={updateProfileDatas}>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.modal}>
          <Modal isOpen={isOpen} onClose={onClose} header="Modifica il profilo">
              <Input
                id="comment"
                name="comment"
                placeholder="Cosa ne pensi?"
                onChange={handleCommentChange}
                value={commentValue}
              />
          </Modal>
          <button type="submit" className="submit_button">
            Conferma
          </button>
        </div>
      </form>
    </>;
};

export default CommentModal;
