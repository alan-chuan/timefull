"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ selectedDay }) => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchTodoList();
  }, [selectedDay]);

  const toggleTodo = async (todoId, newIsDone) => {
    const data = {
      email: session?.user?.email,
      id: todoId,
      isDone: newIsDone,
    };
    console.log("daata");
    console.log(data);

    const response = await fetch("/api/todo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchTodoList();
  };

  const deleteTodo = async (todoId) => {
    const data = {
      email: session?.user?.email,
      id: todoId,
    };

    const response = await fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchTodoList();
  };

  const fetchTodoList = async () => {
    const queryString = `email=${session?.user?.email}&date=${selectedDay}`;
    try {
      const response = await fetch(`/api/todo?${queryString}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const { todos } = await response.json();
        setTodoList(todos);
        console.log(todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    const newTodo = {
      task: input,
      isDone: false,
    };
    const data = {
      email: session?.user?.email,
      task: input,
      isDone: "false",
      date: selectedDay,
    };
    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
    fetchTodoList();
    setTodoList([...todoList, newTodo]);
    setInput("");
  };

  return (
    <div className="h-1/2 bg-white p-4 mt-4 rounded shadow">
      <h2 className="font-bold text-xl mb-4">To-Do List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add a task"
          className="border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            addTodo();
          }}
        >
          Add
        </button>
      </div>

      {todoList &&
        todoList.map((todoItem) => (
          <TodoItem
            key={todoItem._id}
            task={todoItem.task}
            isDone={todoItem.isDone}
            toggleTodo={(newIsDone) => {
              toggleTodo(todoItem._id, newIsDone);
            }}
            deleteTodo={() => {
              deleteTodo(todoItem._id);
            }}
          />
        ))}
    </div>
  );
};

export default TodoList;
