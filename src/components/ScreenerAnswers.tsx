import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { isNumber } from "lodash";
import React from "react";
import {
  IScreenerAnswer,
  IScreenerResponseValue,
} from "../api/screener/screener.types";
import { useCurrentScreener } from "../context/Screener.context";

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
      sx={{ width: "100%", my: 2 }}
      key={`${question?.question_id}-${questionIndex + 1}`}
      value={currentAnswer}
    >
      {options.map((option, index) => (
        <FormControlLabel
          key={`${question?.question_id}-${index + 1}`}
          color="error"
          sx={{
            py: 0.25,
            mb: 1.5,
            borderRadius: 2,
            width: "100%",
            border: "0.75px solid",
            mx: 0,
          }}
          onClick={() => {
            if (option.value !== currentAnswer || lastQuestion) {
              onChange(option.value);
       
            } else {
              goToNextQuestion();
            }
           
          }}
          className={isNumber(currentAnswer)  && lastQuestion ? '' : "slide-in"}
          value={option.value}
          control={<Radio color="primary" size="small" />}
          label={option.title}
          slotProps={{
            typography: {
              variant: "body2",
            },
          }}
        />
      ))}
    </RadioGroup>
  );
};

export default ScreenerAnswers;
