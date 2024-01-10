import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Launch from "./pages/Launch";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      {/* <Dashboard/> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Launch/:id" element={<Launch />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
