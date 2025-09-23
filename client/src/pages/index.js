import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to connect to backend. Make sure the Flask server is running.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Community Data Storage Hub
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          
          {loading && (
            <div className="text-blue-600">Loading...</div>
          )}
          
          {error && (
            <div className="text-red-600 bg-red-50 p-4 rounded-md">
              {error}
            </div>
          )}
          
          {!loading && !error && (
            <div className="text-green-600 bg-green-50 p-4 rounded-md">
              ✅ Backend connection successful! Found {users.length} users in the system.
            </div>
          )}
          
          {users.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Users:</h3>
              <ul className="space-y-2">
                {users.map(user => (
                  <li key={user.id} className="bg-gray-50 p-3 rounded">
                    <strong>{user.username}</strong> - {user.email} ({user.role})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => window.open('http://localhost:5000/api/users/', '_blank')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Users API
            </button>
            <button 
              onClick={() => window.open('http://localhost:5000/api/storage-nodes/', '_blank')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              View Storage Nodes API
            </button>
            <button 
              onClick={() => window.open('http://localhost:5000/api/uploads', '_blank')}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              View Uploads API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
