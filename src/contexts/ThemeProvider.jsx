import { createContext, useEffect, useState, useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { lightThemeColors, darkThemeColors } from "../utils/colors.js";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const el = document.querySelector("[data-theme]");
    if (el) el.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const colors = theme === "dark" ? darkThemeColors : lightThemeColors;

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme === "dark" ? "dark" : "light",
          primary: { main: "#1976d2" },
          secondary: { main: "#dc004e" },
          background: {
            default: colors.main,
            paper: colors.bg,
          },
          text: {
            primary: colors.text,
          },
          divider: colors.border,
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                backgroundColor: colors.main,
                borderRadius: 6,
                transition: "background-color 0.3s ease",
              },
              notchedOutline: {
                borderColor: colors.border,
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 16,
                backgroundColor: colors.bg,
              },
            },
          },
          MuiDialogTitle: {
            styleOverrides: {
              root: {
                fontWeight: "bold",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              },
            },
          },
        },
      }),
    [theme]
  );

  const switchTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ".richTextInput": {
              backgroundColor: colors.main,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: 6,
              padding: "8px 12px",
              minHeight: 100,
              outline: "none",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
              "&:focus": {
                borderColor: colors.accent,
                boxShadow: `0 0 0 2px ${colors.accent}66`, // semitrasparente
              },
            },
            ".styleChanger": {
              cursor: "pointer",
              marginRight: 8,
              padding: "4px 8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
              backgroundColor: "transparent",
              color: colors.text,
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: colors.accent,
                color: colors.bg,
              },
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};