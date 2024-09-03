import { useQuery } from "react-query";
import { getScreener } from "./screener.api";

export const useScreener = () => {
  return useQuery(`screener`, () => getScreener(), {});
};
