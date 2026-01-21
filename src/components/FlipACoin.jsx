import React, { useState, useRef, useEffect } from "react";
import audioFile from "../assets/coin-flip.mp3";

function FlipACoin() {
  // State
  const [mode, setMode] = useState("standard");
  const [customValues, setCustomValues] = useState({
    front: "Yes",
    back: "No",
  });
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const flipSound = useRef(new Audio(audioFile));

  const coinStyle = {
    gold: "linear-gradient(135deg, #fceabb 0%, #f8b500 50%, #fceabb 100%)",
    silver: "linear-gradient(135deg, #e0e0e0 0%, #999999 50%, #e0e0e0 100%)",
    edge: "#b8860b",
  };

  const handleFlip = () => {
    if (isFlipping) return;

    const isHeads = Math.random() > 0.5;
    const winningSide = isHeads ? "front" : "back";
    const winningText =
      mode === "standard"
        ? isHeads
          ? "Heads"
          : "Tails"
        : isHeads
          ? customValues.front
          : customValues.back;
    if (soundEnabled) {
      flipSound.current.currentTime = 0;
      flipSound.current
        .play()
        .catch((e) => console.log("Audio play failed", e));
    }

    const minSpins = 5;
    const currentRot = rotation;
    // Calculate the next target rotation to ensure it always spins forward
    const baseRotation = Math.floor(currentRot / 360) * 360 + minSpins * 360;
    const targetRotation = isHeads ? baseRotation + 360 : baseRotation + 180;

    setIsFlipping(true);
    setRotation(targetRotation);
    setResult(null);

    setTimeout(() => {
      setIsFlipping(false);
      setResult(winningText);
    }, 3000);
  };

  return (
    <main className="min-h-[80vh] bg-slate-100 py-12 px-4 font-sans text-slate-800 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent"></div>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 relative z-10">
            Coin Toss
          </h2>
          <p className="text-slate-400 text-sm font-medium tracking-widest uppercase mt-2 relative z-10">
            Binary decision engine
          </p>
        </div>

        <div className="p-8 flex flex-col items-center">
          {/* Controls Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 w-full">
            <div className="bg-slate-100 p-1 rounded-full flex">
              <button
                onClick={() => setMode("standard")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === "standard" ? "bg-white shadow-md text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
              >
                Heads / Tails
              </button>
              <button
                onClick={() => setMode("custom")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === "custom" ? "bg-white shadow-md text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
              >
                Custom A / B
              </button>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 rounded-full border text-sm font-bold transition-all flex items-center gap-2 ${
                soundEnabled
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
            </button>
          </div>

          <div
            className={`w-full grid grid-cols-2 gap-4 mb-8 transition-all duration-500 overflow-hidden ${mode === "custom" ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                Front (Face)
              </label>
              <input
                type="text"
                value={customValues.front}
                onChange={(e) =>
                  setCustomValues({ ...customValues, front: e.target.value })
                }
                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-yellow-400 focus:ring-0 text-center font-bold text-slate-700"
                placeholder="Option A"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                Back (Tail)
              </label>
              <input
                type="text"
                value={customValues.back}
                onChange={(e) =>
                  setCustomValues({ ...customValues, back: e.target.value })
                }
                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-yellow-400 focus:ring-0 text-center font-bold text-slate-700"
                placeholder="Option B"
              />
            </div>
          </div>

          <div
            className="relative w-64 h-64 my-4 perspective-container"
            style={{ perspective: "1000px" }}
          >
            {/* The Coin */}
            <div
              className="w-full h-full relative"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
                transition: isFlipping
                  ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)"
                  : "transform 0s",
              }}
            >
              {/* FRONT FACE */}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden shadow-xl"
                style={{
                  background: coinStyle.gold,
                  border: `8px solid ${coinStyle.edge}`,
                  backfaceVisibility: "hidden",
                  boxShadow: "inset 0 0 20px rgba(184, 134, 11, 0.5)",
                }}
              >
                <div className="border-4 border-dashed border-yellow-600/30 rounded-full w-48 h-48 flex items-center justify-center p-4">
                  <span className="text-2xl font-black text-yellow-900 uppercase text-center break-words leading-tight">
                    {mode === "standard" ? "HEADS" : customValues.front}
                  </span>
                </div>
              </div>

              {/* BACK FACE */}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden shadow-xl"
                style={{
                  background: coinStyle.silver,
                  border: "8px solid #7f8c8d",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
                }}
              >
                <div className="border-4 border-dashed border-slate-500/30 rounded-full w-48 h-48 flex items-center justify-center p-4">
                  <span className="text-2xl font-black text-slate-700 uppercase text-center break-words leading-tight">
                    {mode === "standard" ? "TAILS" : customValues.back}
                  </span>
                </div>
              </div>
            </div>

            {/* Shadow underneath */}
            <div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-4 bg-black/20 rounded-[100%] blur-md transition-all duration-1000"
              style={{
                transform: isFlipping
                  ? "translateX(-50%) scale(0.5)"
                  : "translateX(-50%) scale(1)",
                opacity: isFlipping ? 0.2 : 0.5,
              }}
            ></div>
          </div>

          {/* Result Display */}
          <div className="h-24 flex items-center justify-center mt-6">
            {result && !isFlipping && (
              <div className="animate-in zoom-in duration-300 text-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Result
                </span>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  {result}
                </div>
              </div>
            )}
            {isFlipping && (
              <div className="text-slate-400 font-bold animate-pulse">
                Defying gravity...
              </div>
            )}
          </div>

          {/* Main Action Button */}
          <button
            onClick={handleFlip}
            disabled={isFlipping}
            className={`
    w-full max-w-sm py-4 rounded-xl font-black text-xl tracking-wide uppercase transition-all transform
    border-b-4 active:border-b-0 active:translate-y-1 mt-4
    ${
      isFlipping
        ? "bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed"
        : "bg-slate-900 border-black text-slate-50 hover:bg-slate-800 shadow-xl"
    }
  `}
          >
            <span className={isFlipping ? "opacity-50" : "opacity-100"}>
              {isFlipping ? "Flipping..." : "FLIP COIN"}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default FlipACoin;
