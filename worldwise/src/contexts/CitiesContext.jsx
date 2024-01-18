import { createContext, useEffect, useContext } from "react";
import propTypes from "prop-types";
import { useReducer } from "react";

const BASE_URL = "http://localhost:5000";

const CitiesContext = createContext();

const INITIAL_STATE = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };

    case "city/created":
      return {
        ...state,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],

        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };

    case "error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );

  async function fetchCity(id) {
    if (+id === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  useEffect(() => {
    const fetchCitites = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: error.message });
      }
    };

    fetchCitites();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCity,
        createCity,
        deleteCity,
      }}
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
