import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/login";
import VistaBodega from "./components/vistaBodega/vistaBodega";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/VistaAdmin" element={<Login />} />
        <Route path="/VistaContabilidad" element={<Login />} />
        <Route path="/VistaBodega" element={<VistaBodega />} />
      </Routes>
    </Router>
  );
}

export default App;
