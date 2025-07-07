import React, { useState, useEffect } from "react";
import { fetchWinningOfferAPI } from "../apiClient";
import ResultPopUp from "./resultPopUp";

const SpinButton = (props) => {
  const { config, contextData, segments, segmentAngle } = props;
  const { setRotation, isSpinning, setIsSpinning, isLoading, setError } = props;
  const segmentsExist = segments && segments.length > 0;
  const spinButtonColor = config?.spinButtonColor || "#00a63e"; // Default button color
  const spinButtonTextColor = config?.spinButtonTextColor || "#FFFFFF"; //

  // --- State Management ---
  const [winningSegment, setWinningSegment] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  // --- Core Logic ---
  const handleSpinClick = async () => {
    if (isSpinning || !segmentsExist) return;
    setIsSpinning(true);
    setError(null);
    setWinningSegment(null);
    setIsCodeCopied(false);

    // Start an initial spin immediately
    setRotation(360 * 25); // Initial 2 rotations to show immediate feedback

    try {
      // Fetch the winner while the wheel is doing its initial spin
      const winner = await fetchWinningOfferAPI({ retailerMoniker: contextData.retailerMoniker, trackingNumber: contextData.trackingNumbers?.[0], carrier: contextData.carrier, orderNumbers: contextData.orderNumbers?.[0] });
      setWinningSegment(winner);

      const winningIndex = segments.findIndex((s) => s.id === winner.id);

      // Reset rotation briefly - this creates a slight pause before final spin
      setRotation(360 * 2);

      // Need to force a reflow to make the rotation reset work properly
      setTimeout(() => {
        // Calculate final rotation to land on the winning segment
        const randomOffset = (Math.random() - 0.5) * segmentAngle * 0.8; // For realism

        // Final spin with enough rotations to make the animation smooth
        const finalRotation =
          360 * 5 + // 5 full spins for a good effect
          (360 - winningIndex * segmentAngle) +
          randomOffset;

        // Set the final rotation for winning segment
        setRotation(finalRotation);

        // Show popup after the spin animation finishes
        setTimeout(() => {
          setShowResultPopup(true);
          setIsSpinning(false);
        }, config.spinDuration * 1000);
      }, 10); // Tiny timeout to ensure the DOM updates between rotation changes
    } catch (err) {
      console.error("Spin failed:", err);
      // Reset the wheel to its initial position when an error occurs
      setRotation(0);
      // Add a short animation for a smoother reset
      setError(err.message || "An error occurred during the spin.");
      setTimeout(() => {
        setIsSpinning(false);
      }, 300);
    }
  };

  return (
    <>
      <div className="mt-8">
        <button
          onClick={handleSpinClick}
          disabled={isLoading || isSpinning}
          className="px-10 py-4 bg-green-600 text-white text-2xl font-bold rounded-full shadow-lg transform transition-transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
          style={{
            backgroundColor: spinButtonColor, // Default button color
            color: spinButtonTextColor, // Default text color
          }}
        >
          {isSpinning ? config.text.spinningButton : config.text.spinButton}
        </button>
      </div>
      {/* Result Popup Modal */}
      <ResultPopUp
        config={config}
        winningSegment={winningSegment}
        showResultPopup={showResultPopup}
        setShowResultPopup={setShowResultPopup}
        isCodeCopied={isCodeCopied}
        setIsCodeCopied={setIsCodeCopied}
      />
    </>
  );
};

export default SpinButton;
