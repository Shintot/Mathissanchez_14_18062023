import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider value={{ users, setUsers, selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};
