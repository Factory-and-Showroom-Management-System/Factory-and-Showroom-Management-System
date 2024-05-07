// SignoutModal.js

import React from "react";

const SignoutModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-50 p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-lg font-bold">Sign Out Confirmation</h2>
        <p className="mb-4">Are you sure you want to sign out?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-white bg-red-500 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={onConfirm}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignoutModal;
