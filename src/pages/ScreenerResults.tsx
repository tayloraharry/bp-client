import { useEffect, useState } from "react";
import { useCurrentScreener } from "../context/Screener.context";
import { submitScreener } from "../api/screener/screener.api";
import { Domain } from "../api/domain/domain.types";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { uniq, uniqBy } from "lodash";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { restart, responses } = useCurrentScreener();
  const [results, setResults] = useState<Domain[]>([]);
  const navigate = useNavigate();
  const processScreener = async () => {
    try {
      const results = await submitScreener(responses);
      setResults(results);
    } catch (error) {}
  };

  const handleDone = () => {
    restart();
    navigate("/screener");
  };

  useEffect(() => {
    processScreener();
  }, []);

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh" px={4}>
      <Typography fontWeight="bold" textAlign="center" mb={2}>
        Based on your responses, you {results.length === 0 ? "do not currently qualify for any additional assesments" : "qualify for the following assesments"}
      </Typography>
      <Stack
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        display="flex"
        gap={2}
        px={1}
        flexWrap="wrap"
        width="100%"
      >
        {uniqBy(results, "level2Assesment").map((r) => (
          <Paper
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 500,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              py: 1,
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle2">{r.title}</Typography>
            <Typography variant="subtitle1">{r.level2Assesment}</Typography>
          </Paper>
        ))}
      </Stack>

      <Button
        onClick={handleDone}
        sx={{ mt: 2, maxWidth: 500 }}
        fullWidth
        size="large"
        variant="contained"
      >
        <Typography textTransform="none">Done</Typography>
      </Button>
    </Stack>
  );
};

export default Results;
