import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMyData = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

interface UsePollingParams {
  queryKey: [string];
  url: string;
  intervalMs?: number;
}

export const usePolling = ({
  queryKey,
  url,
  intervalMs = 1000,
}: UsePollingParams) => {
  return useQuery({
    queryKey,
    queryFn: () => fetchMyData(url),
    refetchInterval: intervalMs,
  });
};
