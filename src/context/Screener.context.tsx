import { isNumber } from "lodash";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { useScreener } from "../api/screener/screener.hooks";
import {
  IScreener,
  IScreenerQuestion,
  IScreenerResponse,
  IScreenerResponseValue,
} from "../api/screener/screener.types";

type QuestionDirection = "previous" | "next";

interface ScreenerContextType {
  question?: IScreenerQuestion;
  questionIndex: number;
  firstQuestion: boolean;
  lastQuestion: boolean;
  questionCount: number;
  previouslyAnswered: boolean;
  questionDirection: QuestionDirection;
  progress: number;
  currentAnswer?: IScreenerResponseValue;
  responses: IScreenerResponse[];
  goToNextQuestion: () => void;
  screener: IScreener | undefined;
  goToPreviousQuestion: () => void;
  restart: () => void;
  setResponse: (questionId: string, answer?: IScreenerResponseValue) => void;
}

const ScreenerContext = createContext<ScreenerContextType | undefined>(
  undefined
);

interface ScreenerProviderProps {
  children: ReactNode;
  initialResponses?: IScreenerResponse[];
}

export const ScreenerProvider: React.FC<ScreenerProviderProps> = ({
  children,
  initialResponses = [],
}) => {
  const { data: screener } = useScreener("123");
  const [questionDirection, setQuestionDirection] =
    useState<QuestionDirection>("next");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] =
    useState<IScreenerResponse[]>(initialResponses);
  const questionCount = useMemo(
    () => screener?.content.sections[0].questions.length || 0,
    [screener]
  );

  const question = useMemo(
    () => screener?.content.sections[0].questions[questionIndex],
    [questionIndex, screener]
  );

  const currentAnswer = useMemo(
    () => responses[questionIndex]?.value,
    [responses, questionIndex]
  );

  const firstQuestion = useMemo(() => questionIndex === 0, [questionIndex]);

  const lastQuestion = useMemo(
    () => questionIndex === questionCount - 1,
    [questionIndex, screener]
  );

  const previouslyAnswered = useMemo(
    () => isNumber(responses[questionIndex]?.value),
    [responses, questionIndex]
  );

  const progress = useMemo(
    () => Math.round((100 * (questionIndex + 1)) / questionCount + 0),
    [questionCount, responses, questionIndex]
  );

  const goToNextQuestion = () => {
    setQuestionDirection("next");
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const goToPreviousQuestion = () => {
    setQuestionDirection("previous");
    setQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const setResponse = (questionId: string, answer?: IScreenerResponseValue) => {
    setResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(
        (r) => r.question_id === questionId
      );

      if (existingResponseIndex >= 0) {
        // Update the existing response
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex] = {
          question_id: questionId,
          value: answer,
        };
        return updatedResponses;
      }

      // Add a new response
      return [...prevResponses, { question_id: questionId, value: answer }];
    });
  };

  return (
    <ScreenerContext.Provider
      value={{
        screener,
        question,
        responses,
        questionDirection,
        questionIndex,
        currentAnswer,
        firstQuestion,
        lastQuestion,
        previouslyAnswered,
        goToNextQuestion,
        goToPreviousQuestion,
        setResponse,
        questionCount,
        progress,
        restart() {
          setQuestionIndex(0);
          setResponses([]);
        },
      }}
    >
      {children}
    </ScreenerContext.Provider>
  );
};

export const useCurrentScreener = (): ScreenerContextType => {
  const context = useContext(ScreenerContext);
  if (!context) {
    throw new Error(
      "useCurrentScreener must be used within a ScreenerProvider"
    );
  }
  return context;
};
