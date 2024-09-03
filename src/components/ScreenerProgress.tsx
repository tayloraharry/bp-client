import { Box, LinearProgress, Typography } from "@mui/material";
import { useCurrentScreener } from "../context/Screener.context";
import { CheckCircle, Circle, CircleOutlined } from "@mui/icons-material";
import { isNumber } from "lodash";
import { green } from "@mui/material/colors";

const ScreenerProgress = () => {
  const { progress, questionIndex, responses, lastQuestion, questionCount } =
    useCurrentScreener();

  return (
    <Box
      flexDirection="row"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={1}
      mr={1}
      alignSelf='center'
      borderRadius={1.5}
      key={questionIndex}
    >
      <LinearProgress
        sx={{
          display: lastQuestion ? "none" : "flex",
          height: 4,
          flex: 1,
          borderRadius: 100,
          width:75,
        }}
        value={progress}
        color="primary"
        variant="determinate"
      />
      <Typography sx={{fontSize:11}}>
        {lastQuestion ? "Final Question" : progress + '%'}
        {lastQuestion ? "" : " Complete"}
      </Typography>
    </Box>
  );
};

export default ScreenerProgress;
