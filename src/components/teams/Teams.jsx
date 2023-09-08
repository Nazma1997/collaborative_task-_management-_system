import React, { useState } from 'react';
import Login from '../Login';



function Teams() {
  const [teamName, setTeamName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [assignToName, setAssignToName] = useState('');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const teamsName = JSON.parse(localStorage.getItem('teams') || []);


  const handleCreateTeam = () => {
    if (teamName) {
      const newTeam = { name: teamName, assignTo: [] };
      const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
      const updatedTeams = [...storedTeams, newTeam];
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
      setTeamName('');
      window.location.reload()
    }
  };

  const handleAssignTo = () => {
    if (selectedTeam && assignTo && assignToName) {
      const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
      const updatedTeams = storedTeams.map((team) => {
        if (team.name === selectedTeam) {
          const newAssignment = { taskName: assignTo, name: assignToName };
          return { ...team, assignTo: [...team.assignTo, newAssignment] };
        }
        return team;
      });
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
      setSelectedTeam('');
      setAssignTo('');
      setAssignToName('');
      window.location.reload()
    }
  };
  const data = localStorage.getItem('user');
  return (
    data ? <div className="team-container">
      <h1 style={{ textAlign: 'center', marginBottom: '3%' }}> Create Team </h1>
      <hr />
      {/* create team  */}
      <form style={{ marginBottom: '3%', marginTop:'5%' }}>
        <label htmlFor="teamName">Team Name:</label>
        <input
          type="text"
          id="teamName"
          value={teamName}
          style={{ width: '90%' }}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button type="button" onClick={handleCreateTeam}>
          Create Team
        </button>
      </form>
      <hr />
      <h2>Teams</h2>
      <hr />
      {/* team name  */}
      <ul>
        {teamsName?.map((team) => (

          <li key={team.name} >
            <div className='teams-name'>
              <p style={{ fontSize: '25px' }}>Team Name: {team.name}</p>
              <button
                type="button"
                onClick={() => setSelectedTeam(team.name)}
              >
                Select
              </button>
            </div>
            <hr />
          </li>


        ))}
      </ul>

      {/* selected team  */}

      {selectedTeam && (
        <div className="select-container">
          <h2>Assign To : {selectedTeam}</h2>
          <hr />
          <label >Tasks :</label> < br />
          <select
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            style={{ marginTop: '2%', marginBottom: '2%', paddingLeft: '1%', paddingRight: '15%', paddingTop: '2%', paddingBottom: '2%' }}
          >
            {tasks?.map((item, index) => (
              
              <option value={item.title} key={index}>
                {item?.title}
              </option>
            ))}
          </select>
          <div className="input-container" style={{ marginTop: '1%', marginBottom: '2%' }}>
            <label>Name:</label> <br />
            <input
              placeholder="Name"
              value={assignToName}
              onChange={(e) => setAssignToName(e.target.value)}
              style={{ marginTop: '2%', marginBottom: '2%', paddingLeft: '10%', paddingRight: '5%',paddingTop:'2%', paddingBottom:'2%'  }}
            />
          </div>
          <button type="button" onClick={handleAssignTo}>
            Assign To
          </button>
        </div>
      )}
    </div> : <Login />
  );
}

export default Teams;
