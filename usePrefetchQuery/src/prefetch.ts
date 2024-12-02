import { fetchTodoApi } from "./fetchApi";
import { queryClient } from "./main";

export const prefetch = async () => {
  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoApi,
  });
};
