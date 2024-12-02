import { usePrefetchQuery /*useQuery*/ } from "@tanstack/react-query";
import { prefetch } from "./prefetch";
const Todos = React.lazy(() => import("./Todos"));
import { fetchTodoApiId } from "./fetchApi";
import React from "react";

const App = () => {
  const id = "1";
  // useQuery({
  //   queryKey: ["article", id],
  //   queryFn: () => fetchTodoApiId(id),
  //   notifyOnChangeProps: [],
  // });
  usePrefetchQuery({
    queryKey: ["article", id],
    queryFn: () => fetchTodoApiId(id),
  });
  return (
    <div>
      {" "}
      <button onMouseEnter={prefetch} onFocus={prefetch}>
        Show Details
      </button>
      <Todos id="1" />
    </div>
  );
};

export default App;
