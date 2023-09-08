import React from 'react';
import Login from './Login';



const Profile =() => {
  const profile = JSON.parse(localStorage.getItem('user Info'))[0] ;
  const data = localStorage.getItem('user');

  return (
    data ? <div className="Profile-container">
      <h1 style={{ textAlign: 'center', marginBottom: '5%' }}> Profile Information</h1>
      <img src={profile.profilePicture} alt='the profile' className='profile' />
      <div style={{margin:'2% 40%', fontSize:'35px'}}>
        <p >User Name : {profile?.username}</p>
        <p> Bio : {profile?.bio}</p>
      </div>
    </div> : <Login />
  );
}

export default Profile;
