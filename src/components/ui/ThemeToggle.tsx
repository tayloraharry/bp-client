import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import {
  Brightness1,
  Brightness1Outlined,
  Brightness2,
  Brightness3,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useThemeContext } from "../../context/Theme.context";

const ThemeToggleButton = () => {
  const { toggleTheme, isDarkMode } = useThemeContext();

  return (
    <Tooltip title={(isDarkMode ? "Light" : "Dark") + " Mode"} placement='left'>
      <IconButton onClick={toggleTheme} size="small">
        {isDarkMode ? (
          <Brightness7 sx={{ color: "white" }} fontSize="inherit" />
        ) : (
          <Brightness3 fontSize="inherit" sx={{ color: "white" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
