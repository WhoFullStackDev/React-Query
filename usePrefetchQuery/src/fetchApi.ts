import axios from "axios";

interface Todos {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}
export const fetchTodoApi = async (): Promise<Todos[]> => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch api");
  }
};

export const fetchTodoApiId = async (id: string): Promise<Todos> => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch api");
  }
};
