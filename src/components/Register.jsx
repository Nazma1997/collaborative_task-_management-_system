
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
    bio: '',
    profilePicture: null,
  });
const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleProfilePictureUpload = async () => {
    if (!user.profilePicture) return;

    const apiKey = '837d05f4d0c9787e5980a5a7fe323afd'; 

    const formData = new FormData();
    formData.append('image', user.profilePicture);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: apiKey,
        },
      });

      const imageUrl = response.data.data.url;
      setUser({
        ...user,
        profilePicture: imageUrl,
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleRegistration = () => {
    const data = { ...user };
    const existingUsers = JSON.parse(localStorage.getItem('user Info')) || [];
    existingUsers.push(data);
    localStorage.setItem('user Info', JSON.stringify(existingUsers));
     toast.success(' User Register Successfully')
    navigate('/login')
  };


  return (
    <div className="container">
      <h2>Register</h2>
      <div>
        <level>Email :</level>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <level>Password :</level>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <level>User Name :</level>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <level>Bio :</level>
        <textarea
          name="bio"
          placeholder="Bio"
          value={user.bio}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <level>Profile Picture :</level> <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setUser({ ...user, profilePicture: e.target.files[0] })}
        />
        <button onClick={handleProfilePictureUpload}>Upload Profile Picture</button>
        <p >Wait few times to upload image</p>
      </div>
      <button onClick={handleRegistration}>Register</button>
      <p className="error"><Link to='/login'>Already Have An Account? Login</Link></p>
    </div>
  );
}

export default Register;
