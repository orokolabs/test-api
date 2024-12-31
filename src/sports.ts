import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const useSidebarOptions = () => {
  return queryOptions({
    queryKey: ["get_sidebar"],
    queryFn: ({ signal }) =>
      axios
        .get(`https://test.api.betrebound.com/api/v1/sport`, { signal })
        .then((res) => res.data)
        .catch((error) => {
          throw error?.response?.data?.message;
        }),
  });
};
