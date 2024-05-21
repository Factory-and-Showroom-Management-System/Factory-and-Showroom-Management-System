import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileModal from './ProfileModal';

function Profile() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      console.log("Token retrieved:", token); // Debugging
      if (!token) {
        console.error("No token found");
        return;
      }
  
      try {
        const response = await axios.get('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("There was an error fetching the profile!", error);
      }
    };
  
    fetchProfile();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={openModal}
      >
        Show Profile
      </button>
      {isModalOpen && <ProfileModal user={user} onClose={closeModal} />}
    </div>
  );
}

export default Profile;
