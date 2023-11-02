"use client";

const TodoItem = ({ task, isDone, toggleTodo, deleteTodo }) => {
  const handleToggle = async () => {
    isDone == "false" ? (isDone = "true") : (isDone = "false");
    toggleTodo(isDone); // Call toggleTodo with the new status
  };

  const handleDelete = async () => {
    deleteTodo();
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={JSON.parse(isDone)}
        className="h-5 w-5 text-blue-600 border rounded cursor-pointer"
        onChange={() => {
          handleToggle();
        }}
      />
      <span
        className={`text-lg ${
          isDone == "false" ? "text-black" : "line-through text-gray-500"
        }`}
      >
        <p>{task}</p>
      </span>
      <button
        className="ml-2 bg-red-500 text-white p-2 rounded"
        onClick={() => {
          handleDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
