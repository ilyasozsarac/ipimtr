import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home';
import IpLookup from './pages/IpLookup';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <Link to="/">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  IPim.tr
                </h1>
              </Link>
              <nav>
                <ul className="flex space-x-8">
                  <li>
                    <NavLink to="/lookup" className={({ isActive }) => 
                      `text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : ''}`
                    }>
                      IP LOOKUP
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/ports" className={({ isActive }) => 
                      `text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : ''}`
                    }>
                      TCP PORTS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/tools" className={({ isActive }) => 
                      `text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : ''}`
                    }>
                      TOOLS
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lookup" element={<IpLookup />} />
        </Routes>

        <footer className="bg-white shadow-sm mt-8">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <p className="text-center text-gray-500">2025 ipim.tr. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
