import styles from "../Input/Input.module.css"; 

const RichTextInput = ({ id, label, ref, onInput }) => {

  const toggleStyle = (style) => {
    let command = "";
    switch (style) {
      case "b":
        command = "bold";
        break;
      case "i":
        command = "italic";
        break;
      case "u":
        command = "underline";
        break;
      default:
        return;
    }
    document.execCommand(command);
  };

  return (
    <>
      <div className={styles.formField}>
        {label && <label htmlFor={id}>{label}</label>}
        <div
          id={id}
          className={styles.richTextInput}
          contentEditable
          suppressContentEditableWarning={true}
          onInput={onInput}
          ref={ref}
        />
      </div>

      <div>
        <button type="button" onClick={() => toggleStyle("b")}>Grassetto</button>
        <button type="button" onClick={() => toggleStyle("i")}>Corsivo</button>
        <button type="button" onClick={() => toggleStyle("u")}>Sottolineato</button>
      </div>
    </>
  );
};

export default RichTextInput;
