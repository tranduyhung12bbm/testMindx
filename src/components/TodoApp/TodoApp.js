import React, { useState, useEffect } from 'react';
// import './App.css';
import './TodoApp.css'
const TodoApp = () =>  {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (currentTask.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: currentTask,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setCurrentTask('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filterTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="filter-container">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button className="clear-button" onClick={() => setTasks([])}>
        Clear All
      </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        
      
      </div>
     


      <div className="tasks-container">
        <ul>
          {filterTasks().map((task) => (
            <li key={task.id}>
              <span
                className={task.completed ? 'completed' : ''}
                onClick={() => completeTask(task.id)}
              >
                {task.title}
              </span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

     
    </div>
  );
}

export default TodoApp;
