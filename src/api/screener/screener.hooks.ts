import { useQuery } from "react-query";
import { getScreener } from "./screener.api";

export const useScreener = (id?: string) => {
  return useQuery(`screener-${id}`, () => getScreener(id!), {
    enabled: !!id,
  });
};
