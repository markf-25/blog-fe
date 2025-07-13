import FormField from "../FormField/FormField.jsx";
import styles from "./Input.module.css";

const Input = ({id, label, error, ...props }) => {

    return (
        <FormField id={id} label={label} error={error}>
            <input className={styles.input} id={id} {...props}/>
        </FormField>
    )
}

export default Input;