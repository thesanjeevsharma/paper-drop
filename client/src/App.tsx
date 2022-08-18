import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/playground" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
