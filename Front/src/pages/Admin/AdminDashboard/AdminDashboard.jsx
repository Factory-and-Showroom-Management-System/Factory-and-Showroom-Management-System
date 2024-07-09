import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementComponent = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data); // Assuming response.data is an array of users
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:3000/users', {
        name,
        username,
        password,
        role
      });
      alert('User added successfully');
      fetchUsers();
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Failed to add user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      alert('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 mx-8 bg-white shadow-lg md:mx-0 rounded-3xl sm:p-10">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 lg:text-4xl">User Management</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Add User</h3>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input-field" /><br />
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input-field" /><br />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-field" /><br />
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="input-field" /><br />
              <button onClick={handleAddUser} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Add User</button>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Users</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.role}</td>
                        <td className="px-4 py-2">
                          <button onClick={() => handleDeleteUser(user.id)} className="px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementComponent;
