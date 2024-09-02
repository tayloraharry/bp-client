import { Button, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { isNumber } from "lodash";
import { useNavigate } from "react-router-dom";
import { IScreenerResponseValue } from "../api/screener/screener.types";
import ScreenerProgress from "../components/ScreenerProgress";
import ScreenerAnswers from "../components/ScreenerAnswers";
import { useCurrentScreener } from "../context/Screener.context";

export default function RadioButtonsGroup() {
  const {
    screener,
    questionIndex,
    questionDirection,
    question,
    firstQuestion,
    currentAnswer,
    responses,
    lastQuestion,
    progress,
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
    <Grid2
      container
      pt={2}
      columns={24}
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <Grid2 size={{ xs: 21, sm: 18 }} maxWidth={500}>
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
            {screener?.content.display_name}
          </Typography>
        </Stack>
        <ScreenerProgress />
        <Stack
          key={questionIndex}
          className={`${
            questionDirection === "previous" ? "slide-in-left" : "slide-in"
          }`}
        >
          <Stack spacing={2} mt={2} mb={1}>
            <Typography variant="body1">
              {screener?.content.sections[0].title}
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
          options={screener?.content.sections[0].answers || []}
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
      </Grid2>
    </Grid2>
  );
}
