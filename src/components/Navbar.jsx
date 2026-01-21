import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "nord",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "nord" ? "business" : "nord"));
  };

  const getLinkClass = ({ isActive }) => {
    const base =
      "no-underline text-[10px] md:text-[11px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] transition-all duration-200 px-1 md:px-2 py-1";
    const active = "text-slate-900 border-b-2 border-slate-900";
    const inactive =
      "text-slate-400 hover:text-slate-600 border-b-2 border-transparent";

    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-6xl mx-auto px-4 md:px-6 w-full flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/" className="no-underline flex flex-col items-start group">
            <span className="text-lg md:text-xl font-[950] uppercase tracking-tighter text-slate-900 leading-none">
              Decide My Life
            </span>
            <span className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase mt-1">
              Choice Engine
            </span>
          </Link>
        </div>

        {/* Navigation Links - Removed 'hidden md:flex' so they show on mobile */}
        <div className="flex items-center space-x-2 md:space-x-6">
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/spin-the-wheel" className={getLinkClass}>
            Spin
          </NavLink>
          <NavLink to="/flip-a-coin" className={getLinkClass}>
            Coin
          </NavLink>
          <NavLink to="/dice-roll" className={getLinkClass}>
            Dice
          </NavLink>
        </div>

        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-300 hover:text-slate-500 transition-colors bg-transparent border-none cursor-pointer"
            title="Toggle Theme"
          >
            {theme === "nord" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
