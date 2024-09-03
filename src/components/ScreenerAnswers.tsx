import { FormControlLabel, Paper, Radio, RadioGroup } from "@mui/material";
import React from "react";
import {
  IScreenerAnswer,
  IScreenerResponseValue,
} from "../api/screener/screener.types";
import { useCurrentScreener } from "../context/Screener.context";
import { useThemeContext } from "../context/Theme.context";
import { green, lightGreen } from "@mui/material/colors";

interface IScreenerAnswersProps {
  options: IScreenerAnswer[];
  onChange: (value: IScreenerResponseValue) => void;
  selectedValue?: IScreenerResponseValue;
}

const ScreenerAnswers: React.FC<IScreenerAnswersProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
    const {isDarkMode} = useThemeContext()
  const {
    questionIndex,
    goToNextQuestion,
    lastQuestion,
    currentAnswer,
    questionDirection,
    question,
  } = useCurrentScreener();

  return (
    <RadioGroup
      key={`${question?.question_id}-${questionIndex + 1}`}
      sx={{ width: "100%" }}
      value={currentAnswer}
      className="slide-in-answers"
    >
      {options.map((option, index) => (
        <Paper variant='outlined' sx={{mb: 1, ":hover":{
            backgroundColor: isDarkMode ? '#ffffff10' : '#00000010',
            
            
        }}}>
          <FormControlLabel
            key={`${question?.question_id}-${index + 1}`}
            sx={{
              py: 0.5,
              color:'inherit',
              borderRadius: 1,
              width: "100%",
              maxWidth: 475,
              // border: "0.75px solid",
              mx: 0,

            }}
            onClick={() => {
              if (option.value !== currentAnswer || lastQuestion) {
                onChange(option.value);
              } else {
                goToNextQuestion();
              }
            }}
            value={option.value}
            control={<Radio sx={{color:'inherit'}} size="small" />}
            label={option.title}
            slotProps={{
              typography: {
                variant: "body1",
              },
            }}
          />
        </Paper>
      ))}
    </RadioGroup>
  );
};

export default ScreenerAnswers;
