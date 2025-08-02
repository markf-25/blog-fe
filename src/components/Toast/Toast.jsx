import {useEffect} from "react";
import styles from "./Toast.module.css"

const Toast = ({ header, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.toast}>
            <h3>{header}</h3>
            <div>{message}</div>
        </div>
    );
};

export default Toast;