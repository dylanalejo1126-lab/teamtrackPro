import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./ui/pages/Login";
import Register from "./ui/pages/Register";
import Dashboard from "./ui/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;