import { useSuspenseQueries } from "@tanstack/react-query";
import { fetchUserApi, fetchUserTodo } from "./fatchuserByEmail";

const App = () => {
  const [usersQuery, todoQuery] = useSuspenseQueries({
    queries: [
      { queryKey: ["users"], queryFn: fetchUserApi },
      { queryKey: ["todo"], queryFn: fetchUserTodo },
    ],
  });
  return (
    <div>
      {usersQuery.data.map((info) => (
        <div key={info.id}>
          <div>{info.name}</div>
        </div>
      ))}
      {todoQuery.data.map((info) => (
        <div key={info.id}>
          <div>{info.title}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
