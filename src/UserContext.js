import React, { createContext, useState, useEffect } from 'react';
import { openDB } from 'idb';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Récupérer les utilisateurs de la base de données IndexedDB lorsque le composant est monté
  useEffect(() => {
    const fetchUsers = async () => {
      const db = await openDB('MyDatabase', 1, {
        upgrade(db) {
          db.createObjectStore('users', { keyPath: 'id' });
        },
      });
      const storedUsers = await db.getAll('users');
      setUsers(storedUsers);
    };

    fetchUsers().then(r => r);
  }, []);

  // Sauvegarder un nouvel utilisateur dans la base de données
  const saveUser = async (user) => {
    const db = await openDB('MyDatabase', 1);
    await db.put('users', user);
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <UserContext.Provider value={{ users, setUsers: saveUser, selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};
