import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { PROTECTED_ROUTE_PATHS, ROUTES } from "./constants/routes";

import { Home, Login } from "./pages";
import { selectIsLoggedIn } from "./store/slices/user/selectors";

const RouteProtection = (props: any) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  console.log({ isLoggedIn, props, location });

  if (isLoggedIn) {
    if (PROTECTED_ROUTE_PATHS.includes(location.pathname)) {
      return props.children;
    }

    console.log("Navigating...");

    return <Navigate to={ROUTES.HOME.path} />;
  }

  return <Navigate to={ROUTES.LOGIN.path} />;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/playground"
        element={
          <RouteProtection>
            <Home />
          </RouteProtection>
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
