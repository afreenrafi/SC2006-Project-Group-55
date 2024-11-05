import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const toggleBookmark = (event) => {
    setSavedEvents((prevSavedEvents) => {
      if (prevSavedEvents.some((e) => e.id === event.id)) {
        // remove event if already saved
        return prevSavedEvents.filter((e) => e.id !== event.id);
      } else {
        // add new event
        return [...prevSavedEvents, event];
      }
    });
  };

  // to add a new event created by organiser
  const addEvent = (event) => {
    setCreatedEvents((prevEvents) => [...prevEvents, event]);
  };

  // to remove or update an event by organiser
  const removeEvent = (eventId) => {
    setCreatedEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  return (
    <AppContext.Provider value={{ savedEvents, toggleBookmark, createdEvents, addEvent, removeEvent }}>
      {children}
    </AppContext.Provider>
  );
};
