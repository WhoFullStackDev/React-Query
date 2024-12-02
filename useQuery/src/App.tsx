import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchTodoApi } from "./fetchApi";
import { useState } from "react";

function App({ id }: { id: string }) {
  const [page, setPage] = useState(0);
  const { data, isError, isPending, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["Todos", id, page],
      // queryFn: fetchTodoApi,
      queryFn: () => fetchTodoApi(id, page),
      staleTime: 5 * 1000,
      refetchOnReconnect: true,
      refetchOnMount: true,
      enabled: !!id,
      retry: 10,
      placeholderData: keepPreviousData,
      retryDelay: 1000,
    });
  if (isPending || isFetching) {
    return <div>Loading....</div>;
  }
  if (isError) {
    <div>{error.message}</div>;
  }
  return (
    <>
      {data?.map((val) => (
        <ul key={val.id}>
          <li>{val.title}</li>
        </ul>
      ))}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData && data) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !data}
      >
        Next Page
      </button>
    </>
  );
}

export default App;
