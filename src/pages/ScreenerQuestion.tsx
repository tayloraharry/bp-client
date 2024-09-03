import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { isNumber } from "lodash";
import { useNavigate } from "react-router-dom";
import { IScreenerResponseValue } from "../api/screener/screener.types";
import ScreenerAnswers from "../components/ScreenerAnswers";
import ScreenerProgress from "../components/ScreenerProgress";
import { useCurrentScreener } from "../context/Screener.context";

export default function ScreenerQuestion() {
  const {
    screener,
    questionIndex,
    questionDirection,
    question,
    firstQuestion,
    currentAnswer,
    lastQuestion,
    setResponse,
    goToNextQuestion,
    goToPreviousQuestion,
  } = useCurrentScreener();
  const navigate = useNavigate();

  const handleResponse = (answer: IScreenerResponseValue) => {
    if (question?.question_id) {
      setResponse(question?.question_id, answer);

      if (!lastQuestion) {
        goToNextQuestion();
      }
    }
  };

  const handleSubmit = async () => navigate("/results");

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh", // Ensures the content is centered vertically
        overflowY: "auto",  // Allows vertical overflow
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        lg={6}
        sx={{
          maxWidth: 500,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack
          flexDirection="row"
          position="relative"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <IconButton
            sx={{
              opacity: firstQuestion ? 0 : 1,
              position: "absolute",
              left: 0,
            }}
            disabled={firstQuestion}
            onClick={goToPreviousQuestion}
          >
            <ArrowBack fontSize="inherit" />
          </IconButton>

          <Typography variant="body1" textAlign="center" alignSelf="center">
            {screener?.content?.display_name}
          </Typography>
        </Stack>

        <ScreenerProgress />

        <Stack
          key={questionIndex + questionDirection}
          className={`${''
            // questionDirection === "previous" ? "slide-in-left" : "slide-in"
          }`}
          sx={{ overflowY: "auto", flexGrow: 1 }}  // Allows vertical overflow
        >
          <Stack spacing={2} mt={2} mb={1}>
            <Typography variant="body1">
              {screener?.content?.sections[0]?.title}
            </Typography>

            <Typography variant="body1" key={questionIndex}>
              {question?.title}
            </Typography>
          </Stack>
        </Stack>

        <ScreenerAnswers
          key={currentAnswer}
          selectedValue={currentAnswer}
          onChange={handleResponse}
          options={screener?.content?.sections[0]?.answers || []}
        />

        {lastQuestion ? (
          <Stack pt={0.5} direction="row">
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={!isNumber(currentAnswer)}
            >
              <Typography textTransform="none">
                {lastQuestion ? "Submit" : "Next"}
              </Typography>
            </Button>
          </Stack>
        ) : null}
      </Grid>
    </Grid>
  );
}
