import React from 'react';
import Login from '../Login';


function Dashboard() {
  const teams = JSON.parse(localStorage.getItem('teams')) || [];
  const data = localStorage.getItem('user');

  return (
   data? <div className="dashboard-container">
      <h1 style={{textAlign:'center', marginBottom:'5%'}}> summary of tasks across all teams</h1>
      <div>
        {teams.map(team => (
          <div key={team.name} className="team-container">
            <h2>Team: {team.name}</h2>
            <hr />
            <div className="task-list">
              {team.assignTo.map(member => (
                <div  key={member.taskName}>
                    <p style={{fontSize:'25px'}}>Task Name : {member.taskName}</p>
                  <hr />
                </div>
                
              ))}
              
            </div>
          </div>
        ))}
      </div>
    </div> : <Login />
  );
}

export default Dashboard;
