import styles from "../Input/Input.module.css"; 

const RichTextComponent = ({ id, label, ref, onInput }) => {

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

      <div className={styles.styleWrapper}>
        <button
  type="button"
  className={styles.styleChanger}
  style={{ fontWeight: "bold" }}
  onClick={() => toggleStyle("b")}
>
  B
</button>

<button
  type="button"
  className={styles.styleChanger}
  style={{ fontStyle: "italic" }}
  onClick={() => toggleStyle("i")}
>
  I
</button>

<button
  type="button"
  className={styles.styleChanger}
  style={{ textDecoration: "underline" }}
  onClick={() => toggleStyle("u")}
>
  S
</button>
      </div>
    </>
  );
};

export default RichTextComponent;
