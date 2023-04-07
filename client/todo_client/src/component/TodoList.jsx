/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import CreateTodo from './CreateTodo';
import {
  createTodoService,
  deleteTodoService,
  getAllTodos,
  getTodos,
  updateTodoService,
  deleteCheckedTodosService
} from '../services/todoService';
import { Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { errorToast, successToast } from '../helper/ToastComponent';
const ITEMS_PER_PAGE = 6;
function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationPage, setPaginationPage] = useState(1);
  const [isEdited, setIsEdited] = useState(false);
  const [checked, setChecked] = useState([]);
  // eslint-disable-next-line
  const [allTodos, setAllTodos] = useState([]);
  //fetch Todo
  useEffect(() => {
    setTodoList(todoList);
    const fetchTodoList = async () => {
      const todoListFromDB = await getTodos(currentPage);
      const totalTodoListFromDB = await getAllTodos();
      setAllTodos(totalTodoListFromDB?.data?.data?.data);
      console.log(todoListFromDB.data.data.totalDocs, '+++++++++++');
      setTotalPages(todoListFromDB.data.data.totalDocs);
      setPaginationPage(Math.ceil(todoListFromDB.data.data.totalDocs / 6));
      setTodoList(todoListFromDB?.data?.data?.data);
    };
    fetchTodoList();
  }, [currentPage, isChanged]);

  //edit click
  const handleEditClick = (e) => {
    if (isEdited === true) {
      setChecked([]);
    }
    setIsEdited(!isEdited);
  };

  //handle check
  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    console.log(updatedList);
    setChecked(updatedList);
  };
  //pagination click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  //Delete Todo
  const handleDelete = async (id) => {
    try {
      const resp = await deleteTodoService(id);
      if (resp.status === 200) {
        successToast('Todo deleted successfully!');
      } else {
        errorToast('Todo not deleted!');
      }
    } catch (error) {
      errorToast('Todo not deleted!');
    }
    // setId(!showModal);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const filteredTodoList = todoList.filter((task) => task.todo_id !== id);
    setTodoList(filteredTodoList);
    if (filteredTodoList.length % ITEMS_PER_PAGE === 0 && currentPage === paginationPage) {
      setCurrentPage(currentPage - 1); // go back to the previous page
    }
    // check if the first page will become empty after deleting the item(s)
    else if (filteredTodoList.length < ITEMS_PER_PAGE) {
      // setCurrentPage(currentPage); // go to the next page
      setIsChanged(!isChanged);
    }
  };

  //checked delete
  const handleCheckedDeleteClick = async (event) => {
    try {
      const data = {
        todos: checked
      };
      const resp = await deleteCheckedTodosService(data);
      if (resp.status === 200) {
        successToast('Todos deleted successfully!');
      } else {
        errorToast('Todos not deleted!');
      }
    } catch (error) {
      errorToast('Todos not deleted!');
    }
    // setId(!showModal);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // setTodoList(filterCheckedList);
    setChecked([]);
    setIsEdited(false);
    setIsChanged((prevstate) => !prevstate);
  };

  //update Todo
  const handleUpdate = async (data, id) => {
    try {
      const resp = await updateTodoService(id, data);
      if (resp.status === 200) {
        setIsChanged(!isChanged);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        successToast('Todo updated successfully!');
      } else {
        errorToast('Todo not updated !');
      }
    } catch (error) {
      errorToast('Todo not updated !');
    }
  };

  //created Todo
  const handleOnAddTodo = async (data) => {
    try {
      const resp = await createTodoService(data);
      if (resp.status === 201) {
        successToast('Todo Created!');
        setIsChanged(!isChanged);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      errorToast('Todo is not created!');
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    console.log(totalPages, '#########');
    for (let i = 1; i <= paginationPage; i++) {
      items.push(
        <PaginationItem key={i} active={i === currentPage}>
          <PaginationLink onClick={() => handlePageClick(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div>
      <CreateTodo onAdd={handleOnAddTodo} />
      <div
        style={{
          width: '20%',
          marginLeft: '80%',
          display: 'flex',
          justifyContent: 'space-around'
        }}>
        <Button style={{ width: '100px' }} onClick={handleEditClick}>
          {isEdited === false ? 'Edit' : 'Cancle'}
        </Button>
        {checked?.length > 0 && isEdited === true ? (
          <Button
            style={{ width: '100px', backgroundColor: 'rebeccapurple' }}
            onClick={handleCheckedDeleteClick}>
            Delete
          </Button>
        ) : (
          ''
        )}
      </div>
      <ul style={{ marginTop: '20px' }}>
        {todoList?.length > 0 ? (
          todoList.map((task) => (
            // <li>{task.description}</li>
            <div key={task.todo_id} style={{ display: 'flex', alignItems: 'center' }}>
              {isEdited ? (
                <input value={task.todo_id} type="checkbox" onChange={handleCheck} />
              ) : (
                ''
              )}
              <Todo
                key={task.todo_id}
                todoData={task}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </div>
          ))
        ) : (
          <h2>No Todos!!</h2>
        )}
      </ul>
      {todoList && (
        <Pagination style={{ justifyContent: 'center' }}>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem disabled={currentPage === paginationPage}>
            <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)} />
          </PaginationItem>
        </Pagination>
      )}
      <ToastContainer />
    </div>
  );
}

export default TodoList;
