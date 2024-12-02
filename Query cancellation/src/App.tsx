import { matchQuery, useQuery, useQueryClient } from "@tanstack/react-query";

const App = () => {
  // ###########Query cancellation#################
  // const query = useQuery({

  //   queryKey: ["todos"],
  //   queryFn: async ({ signal }) => {
  //     const todosResponse = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos ",
  //       {
  //         // Pass the signal to one fetch
  //         signal,
  //       }
  //     );
  //     const todos = await todosResponse.json();

  //     const todoDetails = todos.map(async ({ details }) => {
  //       const response = await fetch(details, {
  //         // Or pass it to several
  //         signal,
  //       });
  //       return response.json();
  //     });

  //     return Promise.all(todoDetails);
  //   },
  // });
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async ({ signal }) => {
      const resp = await fetch("https://jsonplaceholder.typicode.com/todos", {
        signal,
      });
      return resp.json();
    },
  });
  console.log(query.data);
  const queryClient = useQueryClient();

  // ########Query filter###########
  // Cancel all queries
  const FilterQuery = async () => {
    await queryClient.cancelQueries();

    // Remove all inactive queries that begin with `posts` in the key
    queryClient.removeQueries({ queryKey: ["posts"], type: "inactive" });

    // Refetch all active queries
    await queryClient.refetchQueries({ type: "active" });

    // Refetch all active queries that begin with `posts` in the key
    await queryClient.refetchQueries({ queryKey: ["posts"], type: "active" });
  };

  // ########## filter Mutation#########
  const FilterMutatio = async () => {
    // Get the number of all fetching mutations
    await queryClient.isMutating();

    // Filter mutations by mutationKey
    await queryClient.isMutating({ mutationKey: ["post"] });

    // Filter mutations using a predicate function
    await queryClient.isMutating({
      predicate: (mutation) => mutation.options?.variables?.id === 1,
    });
  };

  // #########match query#############
  // const isMatching = matchQuery(filters, query);

  // ############Match mutation #############
  // const isMatching = matchMutation(filters, mutation);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        queryClient.cancelQueries({ queryKey: ["todos"] });
      }}
    >
      Cancel
    </button>
  );
};

export default App;
