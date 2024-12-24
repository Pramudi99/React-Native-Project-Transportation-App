// context/DriverContext.js
import React, { createContext, useState, useEffect } from 'react';

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [totalReacts, setTotalReacts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        const driversWithReacts = data.map((driver) => ({
          ...driver,
          reacts: 0,
          hasReacted: false,
        }));

        setDrivers(driversWithReacts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const toggleReact = (index) => {
    const updatedDrivers = [...drivers];
    const selectedDriver = updatedDrivers[index];

    if (selectedDriver.hasReacted) {
      selectedDriver.reacts -= 1;
      setTotalReacts(totalReacts - 1);
    } else {
      selectedDriver.reacts += 1;
      setTotalReacts(totalReacts + 1);
    }

    selectedDriver.hasReacted = !selectedDriver.hasReacted;
    setDrivers(updatedDrivers);
  };

  return (
    <DriverContext.Provider
      value={{
        drivers,
        isLoading,
        totalReacts,
        toggleReact,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

