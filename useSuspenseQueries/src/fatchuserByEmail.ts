import axios from "axios";

export const fetchUserApi = async () => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    return res?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch api");
  }
};

export const fetchUserTodo = async () => {
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
