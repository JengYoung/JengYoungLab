import request from "@/apis/request";

const toggleTodo = async (todoId) => {
  return await request(`/${todoId}/toggle`, {
    method: "PUT",
  });
};

export default toggleTodo;
