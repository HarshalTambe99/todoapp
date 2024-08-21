import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    toast.success("You have logout successfully")
  };


  const handleCreateTodo = () => {
    if(newTodo.title==""){
      toast.error('Please fill the required data');
      return;
    }
    else{
      setTodos([...todos, { ...newTodo, id: Date.now() }]);
      setNewTodo({ title: '', description: '' });
      toast.success("Task added successfully")
    }
  };


  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.warning("You have deleted the task")
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>

      <nav className="bg-gray-800 p-4 text-white flex justify-between">
        <h1 className="text-xl">Todo App</h1>
        <button onClick={handleLogout} className="bg-red-500 p-2 rounded">
          Logout
        </button>
      </nav>


      <div className="p-8">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        

        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="border p-2 rounded mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="border p-2 rounded mr-2"
          />
          <button onClick={handleCreateTodo} className="bg-blue-500 text-white p-2 rounded">
            Add Todo
          </button>
        </div>
        

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded mb-4"
        />

        <div>
          {filteredTodos.map((todo) => (
            <div key={todo.id} className="p-4 border-b">
              <h3 className="text-xl">{todo.title}</h3>
              <p>{todo.description}</p>
              <div>
                <button onClick={() => handleDeleteTodo(todo.id)} className="text-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

