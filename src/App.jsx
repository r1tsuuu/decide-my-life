import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import useDarkMode from './hooks/useDarkMode.jsx';
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import SpinTheWheel from "./components/SpinTheWheel.jsx";
import FlipACoin from "./components/FlipACoin.jsx";
import Footer from "./components/Footer.jsx";
import DiceRoll from "./components/DiceRoll.jsx";

function App() {
  // const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 font-sans bg-base-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spin-the-wheel" element={<SpinTheWheel />} />
          <Route path="/flip-a-coin" element={<FlipACoin />} />
          <Route path="/dice-roll" element={<DiceRoll />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
