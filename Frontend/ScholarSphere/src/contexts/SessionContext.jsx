import React, { createContext, useState, useContext } from 'react';

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [user, setUser] = useState({});


  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
