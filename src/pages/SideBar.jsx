import React from 'react';

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <div className="flex-grow p-4">
        <ul className="space-y-4">
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Catégories</a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Settings</a>
          </li>
        </ul>
        <button>click me</button>
      </div>
    </div>
  );
}

export default Sidebar;
