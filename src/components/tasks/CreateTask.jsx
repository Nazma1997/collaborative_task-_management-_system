import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login';
import { toast } from 'react-toastify';

const CreateTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    assignedTo: '',
    status: 'Pending',
  });
  const navigate = useNavigate()
  useEffect(() => {
    // Retrieve existing tasks from localStorage when the component initializes
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleTaskCreation = () => {
    if (newTask.title && newTask.dueDate && newTask.assignedTo) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        assignedTo: '',
        status: 'Pending',
      });

      // Store the updated tasks array in localStorage
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      toast.success('Task Created Successfully')
      navigate('/tasks')
      window.location.reload()
    } else {
      alert('Please fill in the required fields (Title, Due Date, Assigned To).');
    }
  };

  const data = localStorage.getItem('user');

  return (
    data ? <div>
      <div className="parent-container">
        <div className="button-container">
          <Link to='/tasks'>
            <button>All Tasks</button>
          </Link>
        </div>

      </div>

      <h3 className='text'>Create Tasks</h3>


      <div className="table-container">

        <div>
          <div>
            <level>Title :</level>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <level>Description :</level>
            <textarea
              name="description"
              placeholder="Description"
              value={newTask.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <level className='level-margin'>Date :</level>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
            />
          </div> <br />
          <div>
            <level className='level-margin'>Priority :</level>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={newTask.assignedTo}
            onChange={handleInputChange}
          />
          <button onClick={handleTaskCreation}>Create Task</button>
        </div>

      </div>
    </div> : <Login />
  );
}

export default CreateTasks;
