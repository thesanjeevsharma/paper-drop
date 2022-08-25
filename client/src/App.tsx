import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import { Home, Login } from './pages';
import { selectIsLoggedIn } from './store/slices/user/selectors';
import usePosition from './hooks/usePosition';

const RouteProtection = () => {
   const isLoggedIn = useSelector(selectIsLoggedIn);

   return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN.path} />;
};

const ReverseRouteProtection = () => {
   const isLoggedIn = useSelector(selectIsLoggedIn);

   return isLoggedIn ? <Navigate to={ROUTES.HOME.path} /> : <Outlet />;
};

const App = () => {
   usePosition();

   return (
      <Routes>
         <Route element={<RouteProtection />}>
            <Route path={ROUTES.HOME.path} element={<Home />} />
         </Route>
         <Route element={<ReverseRouteProtection />}>
            <Route path={ROUTES.LOGIN.path} element={<Login />} />
         </Route>
         <Route path="*" element={<Navigate to={ROUTES.HOME.path} />} />
      </Routes>
   );
};

export default App;
