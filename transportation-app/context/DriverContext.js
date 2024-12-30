
import React, { createContext, useState, useEffect } from 'react';

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [totalReacts, setTotalReacts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = 'DSHMLOO2BuBafVCgECwYnQ==DLYtDO1015PfyJXz';

  const fetchCarDetails = async (model) => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/cars?limit=2&model=camry`, {
        headers: {
          'X-Api-Key': apiKey,
        },
      });
      const carData = await response.json();
      return carData.length > 0 ? carData[0] : null; // Return the first car if available
    } catch (error) {
      console.error('Error fetching car details:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();

        // List of available car images
        const carImages = [
          require('../assets/cars/camry.png'),
          require('../assets/cars/corolla.png'),
          require('../assets/cars/civic.png'),
          require('../assets/cars/accord.png'),
          require('../assets/cars/image.png'),
          require('../assets/cars/image1.png'),
          require('../assets/cars/image2.png'),
        ];

        const getRandomCarImage = () => {
          const randomIndex = Math.floor(Math.random() * carImages.length);
          return carImages[randomIndex];
        };

        // Fetch car details for each driver
        const driversWithDetails = await Promise.all(
          data.results.map(async (driver) => {
            const carDetails = await fetchCarDetails('camry'); 

            return {
              id: driver.login.uuid,
              name: `${driver.name.first} ${driver.name.last}`,
              email: driver.email,
              phone: driver.phone,
              address: `${driver.location.street.name}, ${driver.location.city}, ${driver.location.state}, ${driver.location.country}`,
              carDetails: carDetails
                ? `${carDetails.make} ${carDetails.model} (${carDetails.year})`
                : 'Unknown Car', // Format car details
              avatar: driver.picture.large,
              reacts: 0,
              hasReacted: false,
              carImage: getRandomCarImage(), // Assign a random car image
            };
          })
        );

        setDrivers(driversWithDetails);
      } catch (error) {
        console.error('Error fetching driver data:', error);
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






