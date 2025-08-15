import styles from "./Modal.module.css";
import { ThemeContext } from "../../contexts/ThemeProvider.jsx";
import { useContext } from "react";

import logoLight from "../../../src/assets/logo-blog-black.png"
import logoDark from "../../../src/assets/logo-blog-white.png"


function Modal({ isOpen, children, onClose, header }) {
  
  const {theme} = useContext(ThemeContext)

  if (!isOpen) return null;


  return (
    <div className={styles.content}>
      <div aria-label="modal" onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2>{header}</h2>
            <div>
              <img className={styles.logo} src={theme === 'dark' ? logoDark : logoLight} alt="Blog logo"/>
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
