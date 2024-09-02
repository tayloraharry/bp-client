export interface IScreenerAnswer {
  title: string;
  value: IScreenerResponseValue;
}

export interface IScreenerQuestion {
  question_id: string;
  title: string;
}

export interface IScreenerSection {
  type: string;
  title: string;
  answers: IScreenerAnswer[];
  questions: IScreenerQuestion[];
}

export interface IScreenerContent {
  sections: IScreenerSection[];
  display_name: string;
}

export interface IScreener {
  id: string;
  name: string;
  disorder: string;
  content: IScreenerContent;
  full_name: string;
}

export type IScreenerResponseValue = 0 | 1 | 2 | 3 | 4;

export interface IScreenerResponse {
  question_id: string;
  value?: IScreenerResponseValue;
}
