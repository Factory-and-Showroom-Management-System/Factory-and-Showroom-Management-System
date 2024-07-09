import React from 'react';
import userImage from './user.png'; // Import the default profile image

const ProfileModal = ({ user, onClose }) => {
  if (!user) {
    return null; // Render nothing if user is undefined
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold">User Profile</h1>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-center gap-20 mb-4">
            <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-200 rounded-full">
              <img src={user.profileImageUrl || userImage} alt="Profile" className="object-cover w-full h-full" />
            </div> <div className='font-semibold uppercase mt-7'>{user.role} </div>
          </div>
          <div className="flex p-4 mb-4 border border-gray-200 rounded-md gap-9">
            <p className="font-bold">Name:</p>
            <p className='capitalize'>{user.name}</p>
          </div>
          <div className="flex gap-2 p-4 mb-4 border border-gray-200 rounded-md">
            <p className="font-bold">Username:</p>
            <p>{user.username}</p>
          </div>
        </div>
        <button
          className="w-full px-4 py-2 mt-6 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
