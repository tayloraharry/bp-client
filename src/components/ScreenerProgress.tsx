import { Box, LinearProgress, Typography } from "@mui/material";
import { useCurrentScreener } from "../context/Screener.context";

const ScreenerProgress = () => {
  const { progress, questionIndex, lastQuestion, questionCount } =
    useCurrentScreener();

  return (
    <Box
      width="100%"
      flexDirection="row"
      display="flex"
      alignItems="center"
      gap={1.5}
      maxWidth={200}
      borderRadius={1.5}
      key={questionIndex}
    >
      <Typography variant="caption">
        {lastQuestion ? 'Final Question' : `Question ${questionIndex + 1}/${questionCount}`}
      </Typography>
      <LinearProgress
        sx={{ display: lastQuestion ? 'none' :'flex', height: 4, flex: 1, borderRadius: 100 }}
        value={progress}
        variant="determinate"
      />
    </Box>
  );
};

export default ScreenerProgress;
