import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "./main";

const App = () => {
  const mutation = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: (newTodo: { id: Date; title: string }) => {
      return axios.post("http://localhost:3000/todos", newTodo);
    },
    onSuccess: async (data, variables) => {
      console.log("I'm first!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.setQueryData(["todos", { id: variables.id }], data);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    retry: 3,
  });

  const { data } = useQuery({
    queryKey: ["todos", { version: 20 }],
    queryFn: async (): Promise<{ id: Date; title: string }[]> => {
      const response = await axios.get("http://localhost:3000/todos");
      return response.data;
    },
  });

  return (
    <div>
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div onClick={() => mutation.reset()}>
              An error occurred: {mutation.error.message}
            </div>
          ) : null}
          {mutation.isSuccess ? <div>Todo added!</div> : null}
          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
      <ul>
        {Array.isArray(data) &&
          data.map((todo, idx) => <li key={idx}>{todo.title}</li>)}
        {mutation.isPending && (
          <li style={{ opacity: 0.5 }}>{mutation.variables?.title}</li>
        )}
      </ul>
    </div>
  );
};

export default App;
