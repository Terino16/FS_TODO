import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState([
    {
      title: '',
      description: ''
    }
  ]);

useEffect(() => {
  fetch("http://localhost:3001/todos", { method: 'GET' })
  .then(response => {return response.json();
  }).then(data=>setTodos(data))
  .catch(error => {
    console.error(error);
  });
}, [])


  const addTodo = (e) => {
    e.preventDefault();
  const datatosend={
    title:newTodo.title,
    description:newTodo.description
  }
    fetch("http://localhost:3001/todos",{method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(datatosend)
  }).then(response=>response.json()).then(data=>setTodos(data),setNewTodo({
    title: '',
    description: ''
  }))
     console.log(datatosend)
  };

  const deleteTodo = (index) => {
    fetch(`http://localhost:3001/todos/${index}`, { method: 'DELETE' })
    .then(response => {return response.json();
    }).then(data=>setTodos(data))
    .catch(error => {
      console.error(error);
    });
  };
  const handleInputChange = (event) => {
    const {name, value } = event.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  return (
    <div className=" min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            name='title'
            className="border rounded p-2 flex-grow"
        placeholder="Title"
        value={newTodo.title}
        onChange={handleInputChange}
          />
          <input
            type="text"
            className="border rounded p-2 flex-grow"
            name="description"
            placeholder="Description"
            value={newTodo.description}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <ul className="mt-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
            >
              <span>{todo.description}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
