import { FormControl, InputLabel, FormHelperText, Box } from "@mui/material";

const FormField = ({ id, label, error, children }) => {
  return (
    <FormControl
      fullWidth
      error={Boolean(error)}
      sx={{ mb: 2 }}
    >
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

      {/* Box serve solo per avvolgere eventuali custom children */}
      <Box sx={{ mt: label ? 2 : 0 }}>
        {children}
      </Box>

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default FormField;
