import { useEffect, useState } from "react";
import { useCurrentScreener } from "../context/Screener.context";
import { submitScreener } from "../api/screener/screener.api";
import { Domain } from "../api/domain/domain.types";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { uniq, uniqBy } from "lodash";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/ui/LoadingIndicator";

const Results = () => {
  const { restart, responses } = useCurrentScreener();
  const [results, setResults] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const processScreener = async () => {
    setLoading(true);
    try {
      const results = await submitScreener(responses);
      setResults(results);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleDone = () => {
    restart();
    navigate("/screener");
  };

  useEffect(() => {
    processScreener();
  }, []);

  if (loading) {
    return <LoadingIndicator/>
  }

  return (
    <Stack alignItems="center" justifyContent="center" minHeight={window.innerHeight-64}>
      <Typography textAlign="center" mb={2}>
        Based on your responses, you{" "}
        {results.length === 0
          ? "do not currently qualify for any additional assesments"
          : "qualify for the following assesments"}
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
            <Typography variant="body1">{r.title}</Typography>
            <Typography variant="subtitle1">{r.level2Assesment}</Typography>
          </Paper>
        ))}
      </Stack>

      <Button
        onClick={handleDone}
        sx={{ mt: 4, maxWidth: 160 }}
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
