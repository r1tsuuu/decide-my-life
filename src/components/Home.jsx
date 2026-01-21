import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { themeChange } from "theme-change";

function Home() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <main className="min-h-[80vh] bg-slate-100 py-12 px-4 font-sans flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* HEADER SECTION */}
        <div className="bg-[#fff] py-12 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent"></div>

          <h1 className="relative z-10 text-5xl md:text-7xl font-[900] uppercase tracking-tighter leading-none text-emerald-400 drop-shadow-[0_2px_2px_rgba(1,1,1,1,0.3)]">
            Decide My Life
          </h1>

          <p className="relative z-10 text-emerald-100/60 text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase mt-6 max-w-lg mx-auto">
            Simple tools to help you make small decisions when you don’t want to{" "}
            {":>"}
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <Link
              to="/spin-the-wheel"
              className="group relative overflow-hidden bg-emerald-800 rounded-2xl border-b-8 border-emerald-950 shadow-2xl hover:-translate-y-2 hover:shadow-emerald-900/50 transition-all duration-300 active:border-b-0 active:translate-y-2 no-underline"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>

              {/* Icon and Text side-by-side */}
              <div className="relative z-10 p-4 md:p-6 flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-3 h-full text-center xl:text-left">
                <span className="text-3xl md:text-4xl group-hover:rotate-12 transition-transform duration-300 filter drop-shadow-md shrink-0">
                  🎡
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm md:text-lg font-black uppercase tracking-tight text-slate-900 mb-1 truncate">
                    Spin Wheel
                  </h2>
                  <p className="hidden md:block text-[10px] font-bold text-emerald-200/80 uppercase tracking-widest leading-relaxed">
                    Let it choose
                  </p>
                </div>
              </div>
            </Link>

            {/* CARD 2: Flip a Coin */}
            <Link
              to="/flip-a-coin"
              className="group relative overflow-hidden bg-emerald-800 rounded-2xl border-b-8 border-emerald-950 shadow-2xl hover:-translate-y-2 hover:shadow-emerald-900/50 transition-all duration-300 active:border-b-0 active:translate-y-2 no-underline"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>

              <div className="relative z-10 p-4 md:p-6 flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-3 h-full text-center xl:text-left">
                <span className="text-3xl md:text-4xl group-hover:rotate-y-180 transition-transform duration-500 filter drop-shadow-md shrink-0">
                  🪙
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm md:text-lg font-black uppercase tracking-tight text-slate-900 mb-1 truncate">
                    Flip Coin
                  </h2>
                  <p className="hidden md:block text-[10px] font-bold text-emerald-200/80 uppercase tracking-widest leading-relaxed">
                    Heads/Tails
                  </p>
                </div>
              </div>
            </Link>

            {/* CARD 3: Roll Dice */}
            <Link
              to="/dice-roll"
              className="group relative overflow-hidden bg-emerald-800 rounded-2xl border-b-8 border-emerald-950 shadow-2xl hover:-translate-y-2 hover:shadow-emerald-900/50 transition-all duration-300 active:border-b-0 active:translate-y-2 no-underline"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>

              <div className="relative z-10 p-4 md:p-6 flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-3 h-full text-center xl:text-left">
                <span className="text-3xl md:text-4xl group-hover:animate-bounce filter drop-shadow-md shrink-0">
                  🎲
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm md:text-lg font-black uppercase tracking-tight text-slate-900 mb-1 truncate">
                    Roll Dice
                  </h2>
                  <p className="hidden md:block text-[10px] font-bold text-emerald-200/80 uppercase tracking-widest leading-relaxed">
                    Number 2-12
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
