import React, { useState, useRef } from "react";
import { Slider } from "rsuite";
import "rsuite/Slider/styles/index.css";

import dice1 from "../assets/dice/1.svg";
import dice2 from "../assets/dice/2.svg";
import dice3 from "../assets/dice/3.svg";
import dice4 from "../assets/dice/4.svg";
import dice5 from "../assets/dice/5.svg";
import dice6 from "../assets/dice/6.svg";
import audioFile from "../assets/dice-142528.mp3";

function DiceRoll() {
  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

  const [dice, setDice] = useState({ one: 0, two: 1 });
  const [isRolling, setIsRolling] = useState(false);
  const [duration, setDuration] = useState(3);
  const [result, setResult] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const rollSound = useRef(new Audio(audioFile));

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);

    if (soundEnabled) {
      rollSound.current.currentTime = 0;
      rollSound.current.play().catch((e) => console.log("Audio failed", e));
    }

    let count = 0;
    const maxCycles = duration * 10;
    const interval = setInterval(() => {
      setDice({
        one: Math.floor(Math.random() * 6),
        two: Math.floor(Math.random() * 6),
      });
      count++;
      if (count >= maxCycles) {
        clearInterval(interval);
        const finalOne = Math.floor(Math.random() * 6);
        const finalTwo = Math.floor(Math.random() * 6);
        setDice({ one: finalOne, two: finalTwo });
        setResult(finalOne + finalTwo + 2);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <main className="min-h-[80vh] bg-slate-100 py-12 px-4 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* HEADER */}
        <div className="bg-[#fff] py-12 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent"></div>

          <h2 className="relative z-10 text-5xl md:text-7xl font-[900] uppercase tracking-tighter leading-none text-emerald-400 drop-shadow-[0_2px_2px_rgba(1,1,1,1, 0.3)]">
            Roll the Dice
          </h2>
        </div>

        <div className="p-8 flex flex-col items-center">
          {/* Settings */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 w-full items-center">
            <div className="flex-1 max-w-xs space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                Rattle Duration: {duration}s
              </label>
              <Slider
                progress
                defaultValue={duration}
                min={1}
                max={5}
                step={1}
                onChange={setDuration}
                disabled={isRolling}
              />
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${
                soundEnabled
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
            </button>
          </div>

          <div className="relative w-full aspect-video bg-emerald-800 rounded-2xl border-8 border-emerald-950 shadow-inner flex items-center justify-center gap-6 overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>

            <div
              className={`relative transition-all ${isRolling ? "animate-bounce" : "scale-110"}`}
            >
              <div
                className={`bg-white p-2 rounded-2xl shadow-2xl transform ${isRolling ? "rotate-12" : "rotate-0"}`}
              >
                <img
                  src={diceImages[dice.one]}
                  alt="Dice 1"
                  className="w-24 h-24 md:w-32 md:h-32"
                />
              </div>
            </div>

            <div
              className={`relative transition-all ${isRolling ? "animate-bounce [animation-delay:0.1s]" : "scale-110"}`}
            >
              <div
                className={`bg-white p-2 rounded-2xl shadow-2xl transform ${isRolling ? "-rotate-12" : "rotate-0"}`}
              >
                <img
                  src={diceImages[dice.two]}
                  alt="Dice 2"
                  className="w-24 h-24 md:w-32 md:h-32"
                />
              </div>
            </div>
          </div>

          <div className="h-32 flex items-center justify-center mt-6">
            {isRolling ? (
              <div className="text-slate-400 font-bold animate-pulse italic text-xl">
                Shaking the cup...
              </div>
            ) : result ? (
              <div className="text-center animate-in zoom-in duration-300">
                <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] block mb-2">
                  Total Score
                </span>
                <div className="text-7xl font-[950] text-emerald-600">
                  {result}
                </div>
              </div>
            ) : (
              <div className="text-slate-300 font-bold uppercase tracking-widest text-xs">
                Ready to roll
              </div>
            )}
          </div>

          <button
            onClick={handleRoll}
            disabled={isRolling}
            className={`
              w-full max-w-sm py-5 rounded-2xl font-black text-2xl tracking-tighter uppercase transition-all transform
              border-b-8 active:border-b-0 active:translate-y-2 mt-4
              ${
                isRolling
                  ? "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed"
                  : "bg-[#0f172a] border-[#020617] text-white hover:bg-slate-800 shadow-2xl"
              }
            `}
          >
            {isRolling ? "Rolling..." : "Roll Dice"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default DiceRoll;
