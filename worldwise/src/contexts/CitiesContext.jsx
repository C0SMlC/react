import { createContext, useState, useEffect, useContext } from "react";
import propTypes from "prop-types";

const BASE_URL = "http://localhost:5000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function fetchCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchCitites = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCitites();
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, fetchCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
}

// prop validation
CitiesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { useCities, CitiesProvider };
