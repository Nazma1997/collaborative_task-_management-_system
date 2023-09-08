import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login';

const AllTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return storedTasks;
  });

  const [filterStatus, setFilterStatus] = useState('All'); // Filter tasks by status
  const [filterPriority, setFilterPriority] = useState('All'); // Filter tasks by priority
  const [filterDueDate, setFilterDueDate] = useState('All'); // Filter tasks by due date
  const [sortCriteria, setSortCriteria] = useState('DueDate'); // Sort tasks by criteria

  const handleTaskStatusChange = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);

    // Update the tasks array in localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  const isDueDateNear = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const timeDifference = taskDueDate - currentDate;
    return timeDifference >= 0 && timeDifference <= 86400000; // 86400000 milliseconds = 1 day
  };

  // Filtering tasks based on both status and priority
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    const dueDateMatch = filterDueDate === 'All' || (filterDueDate === 'Near' && isDueDateNear(task.dueDate));
    return statusMatch && priorityMatch && dueDateMatch;
  });



  // Sorting function based on selected criteria
  const sortedTasks = [...filteredTasks].sort((taskA, taskB) => {
    switch (sortCriteria) {
      case 'DueDate':
        return new Date(taskA.dueDate) - new Date(taskB.dueDate);
      case 'Priority':
        return taskA.priority.localeCompare(taskB.priority);
      default:
        return 0;
    }
  });

  const data = localStorage.getItem('user');

  return data ? (
    <div>
      <div className="parent-container">
        <div className="button-container">
          <Link to='/create-tasks'>
            <button>Create Task</button>
          </Link>
        </div>

      </div>

      <h3 className='text'>All Tasks</h3>

      {/* Filtering and Sorting Options */}
      <div className='filtering'>
        <div className="filter-sort">
          <label>Filter by Status:</label>
          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="filter-sort priority-sorting">
          <label>Filter by Priority:</label>
          <select onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>

        <div className="filter-sort">
          <label>Filter by Due Date:</label>
          <select onChange={(e) => setFilterDueDate(e.target.value)}>
            <option value="All">All</option>
            <option value="Near">Near Due Date</option>
          </select>
        </div>
      </div>

      {/* Task Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>
                  <button className='button-task' onClick={() => handleTaskStatusChange(index, 'Completed')}>
                    Mark as Completed
                  </button>
                  <button className='button-task' onClick={() => handleTaskStatusChange(index, 'In Progress')}>
                    Mark as In Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
            {sortedTasks.length === 0 && <p className='no-data'>No Data</p>}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default AllTasks;
