import React, { useState, useMemo } from "react";
import { fetchWinningOfferAPI } from "../apiClient";
import ResultPopUp from "./resultPopUp";

const SlotMachine = (props) => {
  console.log("SlotMachine component rendered with props:", props);
  const { config, contextData, offers, colorTheme } = props;
  const { isLoading, setError } = props;

  const spinButtonColor = config?.spinButtonColor || "#00a63e"; // Default button color
  const spinButtonTextColor = config?.spinButtonTextColor || "#FFFFFF"; //

  // --- STATE MANAGEMENT ---
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  // Available symbols for the slot machine reels
  const symbols = ["🍒", "🍋", "🍊", "🍇", "💎", "🔔", "🍀"];

  // State for the three reels, initialized with random symbols
  const [reels, setReels] = useState([symbols[0], symbols[1], symbols[2]]);

  // State to store the generated winning coupon code
  const [winningCoupon, setWinningCoupon] = useState(null);
  // --- HELPER FUNCTIONS ---

  /**
   * Gets a random symbol from the symbols array.
   * @returns {string} A random emoji symbol.
   */
  const getRandomSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];

  // --- EVENT HANDLERS ---

  /**
   * Handles the spin button click event.
   * It simulates the spinning process and determines the outcome.
   */
  const handleSpinClick = () => {
    if (isSpinning) return; // Prevent re-spinning while already spinning
    setWinningCoupon(null); // Reset winning coupon
    setIsSpinning(true);

    // Simulate spinning with an interval
    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setReels([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]);
      spinCount++;
      if (spinCount > 15) {
        // Control the duration of the visual spin
        clearInterval(spinInterval);
        finishSpin();
      }
    }, 100);
  };

  /**
   * Finalizes the spin, sets the result, and checks for a win.
   */
  const finishSpin = async () => {
    const newReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];

    try {
      // Fetch the winner while the wheel is doing its initial spin
      const winner = await fetchWinningOfferAPI({
        retailerMoniker: contextData.retailerMoniker,
        trackingNumber: contextData.trackingNumbers?.[0],
        carrier: contextData.carrier,
        orderNumbers: contextData.orderNumbers?.[0],
      });
      setWinningCoupon(winner);
      if (winner.couponCode != "BLNT") {
        const winningSymbol = getRandomSymbol();
        newReels[0] = winningSymbol;
        newReels[1] = winningSymbol;
        newReels[2] = winningSymbol;
      }

      setReels(newReels);
      setIsSpinning(false);

      setTimeout(() => {
        setShowResultPopup(true);
      }, 500);
      //   // Check for a winning condition (all three reels are the same)
      //   if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
      //     // Use a timeout to allow the final reel symbols to be seen before the modal pops up
      //     setTimeout(() => {
      //       setShowResultPopup(true);
      //     }, 500);
      //   }
    } catch (err) {
      console.error("Spin failed:", err);
      setError(err.message || "An error occurred during the spin.");
      setTimeout(() => {
        setIsSpinning(false);
      }, 300);
    }
  };

  return (
    <>
      {/* Wheel Container */}
      <div className="font-sans bg-gray-900 flex flex-col items-center justify-center p-4 text-white antialiased">
        <div
          className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border-t-4 border-yellow-400"
          style={{
            borderColor: spinButtonColor, // Use the same color for the border
          }}
        >
          <header className="text-center mb-6">
            <h1
              className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider"
              style={{
                color: spinButtonColor,
              }}
            >
              LUCKY SPIN
            </h1>
            <p className="text-gray-400 mt-2">
              Spin to win an exclusive coupon!
            </p>
          </header>

          <main>
            {/* Slot Machine Reels Component */}
            <div className="bg-gray-900/50 rounded-xl p-4 md:p-6 mb-6">
              <div className="flex justify-around items-center gap-4">
                {reels.map((symbol, index) => (
                  <div
                    key={index}
                    className={`reel bg-gray-700 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-inner text-5xl md:text-6xl transition-transform duration-300 ${
                      isSpinning ? "animate-spin-fast" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }} // Stagger animation
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpinClick}
              disabled={isLoading || isSpinning}
              className="w-full bg-yellow-400 text-gray-900 font-bold text-xl py-4 rounded-lg shadow-lg hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: spinButtonColor, // Default button color
                color: spinButtonTextColor, // Default text color
              }}
            >
              {isSpinning ? config.text.spinningButton : config.text.spinButton}
            </button>
          </main>
        </div>

        {/* Result Popup Modal */}
        <ResultPopUp
          config={config}
          winningCoupon={winningCoupon}
          showResultPopup={showResultPopup}
          setShowResultPopup={setShowResultPopup}
          isCodeCopied={isCodeCopied}
          setIsCodeCopied={setIsCodeCopied}
        />

        {/* Custom CSS for Animations */}
        <style jsx="true" global="true">{`
          @keyframes spin-fast {
            0% {
              transform: translateY(-20px);
              opacity: 0;
            }
            50% {
              transform: translateY(20px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-spin-fast {
            animation: spin-fast 0.1s linear infinite;
          }
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
          @keyframes zoom-in {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-zoom-in {
            animation: zoom-in 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
};

export default SlotMachine;
