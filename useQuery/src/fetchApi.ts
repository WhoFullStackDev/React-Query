import axios from "axios";

interface Todos {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}
export const fetchTodoApi = async (
  id: string,
  page: number
): Promise<Todos[]> => {
  try {
    console.log(id);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${page}`
    );
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch api");
  }
};
