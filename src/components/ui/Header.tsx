import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import ThemeToggleButton from "./ThemeToggle";
import { useCurrentScreener } from "../../context/Screener.context";
import {
  ArrowBack,
  ArrowLeft,
  ArrowLeftOutlined,
  KeyboardArrowLeft,
} from "@mui/icons-material";
import ExitDialog from "./ExitDialog";
import { isNumber, rest } from "lodash";
import { useNavigate } from "react-router-dom";
import ScreenerProgress from "../ScreenerProgress";

const Header = () => {
  const { responses, screener, restart, progress } = useCurrentScreener();
  const [exiting, setExiting] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => {
    if (responses.every((r) => !isNumber(r.value))) {
      navigate("/");
    } else {
      setExiting(true);
    }
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px;" }}
      >
        <Toolbar>
          <Stack
            flexDirection="row"
            width="100vw"
            position="relative"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            {/* <Button
              color="inherit"
              onClick={handleExit}
              variant="text"
              sx={{
                zIndex: 1,
                textTransform: "none",
              }}
            >
              Exit
            </Button>
           */}

            <Stack
              width="100%"
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button
                color="inherit"
                onClick={handleExit}
                variant="text"
                sx={{
                  zIndex: 1,
                  textTransform: "none",
                }}
              >
                Exit
              </Button>
              <Stack alignItems="center">
                <Typography variant="body1" fontWeight="500">
                  {screener?.content.display_name}
                </Typography>
                
              </Stack>

              <Box zIndex={1}>
                <ThemeToggleButton />
              </Box>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      
      <ExitDialog
        open={exiting}
        onCancel={() => setExiting(false)}
        onConfirm={() => {
          restart();
          navigate("/");
        }}
      />
    </>
  );
};

export default Header;
