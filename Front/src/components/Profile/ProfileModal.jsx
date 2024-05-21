import React from 'react';

const ProfileModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold">User Profile</h1>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <p className="font-bold">Name:</p>
            <p>{user.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Username:</p>
            <p>{user.username}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Role:</p>
            <p>{user.role}</p>
          </div>
        </div>
        <button
          className="px-4 py-2 mt-6 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
