import FormField from "../FormField/FormField.jsx";
import styles from "./Input.module.css";

const Input = ({ id, label, error, onEnter, ...props }) => {

    const handleEnter = (e) => {
        if (e.key === "Enter" && typeof onEnter === "function") {
            e.preventDefault();
            onEnter(e);
        }
    };

    return (
        <FormField id={id} label={label} error={error}>
            <input
                className={styles.input}
                id={id}
                onKeyDown={handleEnter}
                {...props}
            />
        </FormField>
    );
};

export default Input;
