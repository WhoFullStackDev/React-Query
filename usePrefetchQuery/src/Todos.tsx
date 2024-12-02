import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchTodoApiId } from "./fetchApi";
// import { queryClient } from "./main";

function Todos({ id }: { id: string }) {
  // const { data: articleData, isPending } = useQuery({
  //   queryKey: ["article", id],
  //   queryFn: (...args) => {
  //     queryClient.prefetchQuery({
  //       queryKey: ["user", id],
  //       queryFn: () => fetchTodoApiId(id),
  //     });

  //     return fetchTodoApiId(...args);
  //   },
  // });

  const { data: articleData, isPending } = useSuspenseQuery({
    queryKey: ["article", id],
    queryFn: () => fetchTodoApiId(id),
  });

  if (isPending) {
    return "Loading article...";
  }

  return (
    <>
      <div>{articleData?.title}</div>
      <UserComplete id={articleData?.id as string} />
      //+
    </>
  );
}

function UserComplete({ id }: { id: string }) {
  const { data: userData, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => {
      fetchTodoApiId(id);
    },
    // 1 minute
  });

  if (isError) {
    return "Failed to fetch user data";
  }

  if (!userData) {
    return "Loading user data...";
  }

  return (
    <div>
      <h1>{userData.id}</h1>
    </div>
  );
}

export default Todos;
