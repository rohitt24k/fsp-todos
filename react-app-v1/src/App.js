import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('low');
  const [deadline, setDeadline] = useState('');

  const addTodo = () => {
    if (input.trim() === '') {
      alert('Please enter a todo!');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
      priority: priority,
      deadline: deadline,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
    setPriority('low');
    setDeadline('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='app'>
      <h1>Todo App</h1>
      <div className='container'>
        {/* Left Side: Todo Input Section */}
        <div className='input-section'>
          <h2>Add a New Todo</h2>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter your todo...'
          />
          <div className='options'>
            <label>
              Priority:
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </label>
            <label>
              Deadline:
              <input
                type='date'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
          </div>
          <button onClick={addTodo}>Add Todo</button>
        </div>

        {/* Right Side: Todo List Section */}
        <div className='list-section'>
          <h2>Your Todos</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <div>
                  <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <span>{todo.text}</span>
                  <span className={`priority ${todo.priority}`}>
                    {todo.priority}
                  </span>
                  {todo.deadline && <span>Deadline: {todo.deadline}</span>}
                </div>
                <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
