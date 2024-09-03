import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { isNumber } from "lodash";
import { useNavigate } from "react-router-dom";
import { IScreenerResponseValue } from "../api/screener/screener.types";
import ScreenerAnswers from "../components/ScreenerAnswers";
import ScreenerProgress from "../components/ScreenerProgress";
import Header from "../components/ui/Header";
import LoadingIndicator from "../components/ui/LoadingIndicator";
import { useCurrentScreener } from "../context/Screener.context";

export default function ScreenerQuestion() {
  const {
    isLoading,
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

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      <Header />
      <Grid
        container
        justifyContent="center"
        sx={{
          overflowY: "auto",
          px: 4,
          boxSizing: "border-box",
        }}
      >
        <Stack mt={4}>
          <Stack  mb={2} flexDirection='row' alignItems='center' justifyContent='space-between'>

            <IconButton
              sx={{
                opacity: firstQuestion ? 0 : 1,
                alignSelf: "flex-start",

                color: "text.secondary",
              }}
              disabled={firstQuestion}
              onClick={goToPreviousQuestion}
            >
              <ArrowBack fontSize="inherit" />
            </IconButton>
            <ScreenerProgress />
          </Stack>
          

          <Stack
            key={questionIndex + questionDirection}
            className={`${"slide-in-question"}`}
            sx={{ overflowY: "auto", flexGrow: 1, mb: 2, maxWidth: 474 }}
          >
            <Stack spacing={2} mt={2} mb={1} px={0.5}>
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

          <Stack direction="row">
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{ opacity: lastQuestion ? 1 : 0 }}
              disabled={!lastQuestion || !isNumber(currentAnswer)}
            >
              <Typography textTransform="none">Submit</Typography>
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
}
