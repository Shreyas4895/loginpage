import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./components/pages/login";
import Dashboard from "./components/pages/dashboard";
import { UserAuthContextProvider, useUserAuth } from "./userAuthContext";
import "./App.css";

import { users } from "./constants";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const [userLocation, setUserLocation] = useState("en");

  const handleColorChange = (location) => {
    setUserLocation(location);
  };

  const getLocationTheme = () => {
    const locationConfig =
      users?.locations?.find((loc) => loc?.name === userLocation) ||
      users?.locations[0];
    return createTheme(locationConfig.theme);
  };

  return (
    <div className="App">
      <ThemeProvider theme={getLocationTheme()}>
        <UserAuthContextProvider>
          <Router>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard handleColorChange={handleColorChange} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                exact
                element={<Login handleColorChange={handleColorChange} />}
              />
              <Route
                path="/"
                element={<Login handleColorChange={handleColorChange} />}
              />
            </Routes>
          </Router>
        </UserAuthContextProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
