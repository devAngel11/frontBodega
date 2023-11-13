import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import VistaBodega from "./components/vistaBodega/vistaBodega";
import VistaContabilidad from "./components/VistaContabilidad/vistaConta";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/VistaAdmin" element={<Login />} />
        <Route path="/VistaContabilidad" element={<VistaContabilidad />} />
        <Route path="/VistaBodega" element={<VistaBodega />} />
      </Routes>
    </Router>
  );
}

export default App;
