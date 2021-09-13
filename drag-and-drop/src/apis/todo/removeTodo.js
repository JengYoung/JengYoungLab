import request from "@/apis/request";

const removeTodo = async (id) => {
  return await request(`/${id}`, {
    method: "DELETE",
  });
};

export default removeTodo;
