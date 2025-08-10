import TextField from "@mui/material/TextField";

const Input = ({ id, label, error, onEnter, ...props }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && typeof onEnter === "function") {
      e.preventDefault();
      onEnter(e);
    }
  };

  return (
    <TextField
      id={id}
      label={label}
      error={!!error}
      helperText={error || ""}
      onKeyDown={handleKeyDown}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default Input;