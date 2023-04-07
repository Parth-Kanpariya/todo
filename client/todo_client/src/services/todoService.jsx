import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createTodoService = async (body) => {
  try {
    const resp = await axios.post('/api/todos/', body, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getTodos = async (currentPage) => {
  try {
    const todoList = await axios.get(
      `api/todos/`,
      {
        params: {
          limit: 6,
          page: currentPage
        }
      },
      config
    );
    return todoList;
  } catch (error) {
    return error;
  }
};
export const getAllTodos = async () => {
  try {
    const todoList = await axios.get(`api/todos/`, {}, config);
    return todoList;
  } catch (error) {
    return error;
  }
};

export const updateTodoService = async (id, body) => {
  try {
    const response = await axios.put(`api/todos/${id}`, body, config);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const deleteTodoService = async (id) => {
  try {
    const resp = await axios.delete(`api/todos/${id}`, null, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const deleteCheckedTodosService = async (body) => {
  try {
    console.log(body.todos);
    const resp = await axios.post(`api/todos/deletetodo`, body, config);
    return resp;
  } catch (error) {
    return error;
  }
};
