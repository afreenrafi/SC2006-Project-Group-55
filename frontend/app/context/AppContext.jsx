import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState([]);

  const toggleBookmark = (event) => {
    setSavedEvents((prevSavedEvents) => {
      if (prevSavedEvents.some((e) => e.id === event.id)) {
        // Remove event if already saved
        return prevSavedEvents.filter((e) => e.id !== event.id);
      } else {
        // Add new event
        return [...prevSavedEvents, event];
      }
    });
  };

  return (
    <AppContext.Provider value={{ savedEvents, toggleBookmark }}>
      {children}
    </AppContext.Provider>
  );
};
