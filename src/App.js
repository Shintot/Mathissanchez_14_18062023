import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import du contexte
import CreateEmployee from './CreateEmployee';
import EmployeeList from './EmployeeList';
import Home from './Home';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Create" element={<CreateEmployee />} />
          <Route path="/List" element={<EmployeeList />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
