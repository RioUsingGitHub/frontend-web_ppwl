import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import './index.css';

const API_URL = "http://localhost:8000/api/users";

const App = () =>{
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post(API_URL, newUser);
      fetchUsers();
      setNewUser({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error editing user", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      
      {/* User Form Section */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add or Update User</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            onClick={handleCreateUser}
          >
            Create User
          </button>
        </div>
      </div>

      {/* Users List */}
      <h2 className="text-2xl font-semibold mb-4">Users List</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-md"
                onClick={() => handleUpdateUser(user.id)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
