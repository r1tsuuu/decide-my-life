import React, { useState, useEffect, useMemo } from "react";
import { Wheel } from "react-custom-roulette";
const WHEEL_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
];

const TEXT_COLORS = {
  "#FFEEAD": "#333333",
  default: "#FFFFFF",
};

function MainContent() {
  // State
  const [textareaValue, setTextareaValue] = useState(
    "Pizza\nSushi\nBurgers\nTacos",
  );
  const [weightValue, setWeightValue] = useState("1\n1\n1\n1");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [useWeights, setUseWeights] = useState(false);

  // Derived State
  const itemData = useMemo(() => {
    const items = textareaValue.split("\n").filter((i) => i.trim() !== "");
    const weights = weightValue.split("\n").map((w) => parseFloat(w) || 1);

    return items.map((item, i) => {
      // Cycle through the color palette
      const bgColor = WHEEL_COLORS[i % WHEEL_COLORS.length];
      const textColor = TEXT_COLORS[bgColor] || TEXT_COLORS.default;

      return {
        option: item.trim().substring(0, 30),
        optionSize: useWeights ? weights[i] || 1 : 1,
        style: {
          backgroundColor: bgColor,
          textColor: textColor,
          fontSize: 14,
        },
      };
    });
  }, [textareaValue, weightValue, useWeights]);

  const handleSpin = () => {
    if (mustSpin || itemData.length < 2) return;

    setIsFinished(false); // Reset result

    // Weighted Random Logic
    const totalWeight = itemData.reduce(
      (sum, item) => sum + item.optionSize,
      0,
    );
    let random = Math.random() * totalWeight;

    let winnerIndex = 0;
    for (let i = 0; i < itemData.length; i++) {
      random -= itemData[i].optionSize;
      if (random <= 0) {
        winnerIndex = i;
        break;
      }
    }

    setPrizeNumber(winnerIndex);
    setMustSpin(true);
  };

  const resetWheel = () => {
    setMustSpin(false);
    setIsFinished(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Header*/}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            SPIN THE WHEEL
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          {/* LEFT COLUMN: Inputs */}
          <div className="lg:col-span-5 p-8 bg-slate-50 flex flex-col h-full border-r border-slate-100">
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Options
              </label>
              <button
                onClick={() => setUseWeights(!useWeights)}
                className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                  useWeights
                    ? "bg-purple-100 text-purple-700 border-purple-200"
                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                }`}
              >
                {useWeights ? "⚖️ Weights Active" : "⚖️ Enable Weights"}
              </button>
            </div>

            <div className="flex-1 flex gap-2 relative group">
              <textarea
                className="flex-1 w-full h-full p-4 bg-white border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-0 transition resize-none text-slate-700 leading-relaxed shadow-sm"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Enter choices..."
                disabled={mustSpin}
              />
              {useWeights && (
                <textarea
                  className="w-16 h-full p-4 bg-purple-50 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:ring-0 transition resize-none text-center text-purple-700 font-mono shadow-inner"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  placeholder="1"
                  disabled={mustSpin}
                />
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleSpin}
                disabled={mustSpin || itemData.length < 2}
                className={`
                                    w-full py-4 rounded-xl font-black text-xl tracking-wide uppercase transition-all transform
                                    border-b-4 active:border-b-0 active:translate-y-1
                                    ${
                                      mustSpin
                                        ? "bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-purple-600 to-indigo-600 border-indigo-800 text-white hover:brightness-110 shadow-lg hover:shadow-purple-500/30"
                                    }
                                `}
              >
                {mustSpin ? "Spinning..." : "Spin It"}
              </button>
              {itemData.length < 2 && (
                <p className="text-center text-red-400 text-xs mt-2 font-medium">
                  Add at least 2 items
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Wheel & Stage */}
          <div className="lg:col-span-7 bg-white relative min-h-[500px] flex flex-col items-center justify-center p-8 overflow-hidden">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#6366f1 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            {isFinished && (
              <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                  The Oracle Speaks
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-500 mb-8 text-center px-4 drop-shadow-sm">
                  {itemData[prizeNumber].option}
                </h2>
                <button
                  onClick={resetWheel}
                  className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl"
                >
                  Spin Again
                </button>
              </div>
            )}

            <div
              className={`transition-all duration-700 ${isFinished ? "scale-90 blur-sm grayscale opacity-50" : "scale-100"}`}
            >
              {itemData.length > 0 ? (
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={itemData}
                  // Visual Styling to match theme
                  backgroundColors={["#3e3e3e", "#df3428"]}
                  textColors={["#ffffff"]}
                  outerBorderColor="#ffffff"
                  outerBorderWidth={5}
                  innerRadius={20}
                  innerBorderColor="#ffffff"
                  innerBorderWidth={0}
                  radiusLineColor="#ffffff"
                  radiusLineWidth={1}
                  fontSize={16}
                  textDistance={60}
                  onStopSpinning={() => {
                    setMustSpin(false);
                    setIsFinished(true);
                  }}
                />
              ) : (
                <div className="w-64 h-64 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-bold">
                  Waiting for Input...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
          {itemData.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 text-xs font-medium shadow-sm"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.style.backgroundColor }}
              />
              <span>{item.option}</span>
              {useWeights && (
                <span className="text-slate-400">({item.optionSize})</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default MainContent;
