const RichTextComponent = ({ id, label, ref, onInput, error }) => {
  

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
      <div className="formField">
        {label && <label htmlFor={id}>{label}</label>}
        <div
          id={id}
          className="richTextInput"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={onInput}
          ref={ref}
        />
      </div>
      {error && <div className="errorMessage">{error}</div>}

      <div className="styleWrapper">
        <button
          type="button"
          className="styleChanger"
          onClick={() => toggleStyle("b")}
          aria-label="Bold"
        >
          B
        </button>
        <button
          type="button"
          className="styleChanger"
          onClick={() => toggleStyle("i")}
          aria-label="Italic"
        >
          I
        </button>
        <button
          type="button"
          className="styleChanger"
          onClick={() => toggleStyle("u")}
          aria-label="Underline"
        >
          S
        </button>
      </div>
    </>
  );
};

export default RichTextComponent;