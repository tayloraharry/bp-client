import api from "../api.client";
import { Domain } from "../domain/domain.types";
import {
  IScreener,
  IScreenerAnswer,
  IScreenerResponse,
} from "./screener.types";

async function getScreener(screenerId: string): Promise<IScreener> {
  const response = await api.get<IScreener>(`screener`);

  return response.data;
}

async function submitScreener(
  responses: IScreenerResponse[]
): Promise<Domain[]> {
  const response = await api.post<Domain[]>(`screener/submit`, responses);

  return response.data;
}

export { getScreener, submitScreener };
