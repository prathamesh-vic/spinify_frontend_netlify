import React, { useState, useMemo } from "react";
import { fetchWinningOfferAPI } from "../apiClient";
import ResultPopUp from "./resultPopUp";

const Wheel = (props) => {
  console.log("Wheel component rendered with props:", props);
  const {
    config,
    contextData,
    offers: segments,
    wheelColorTheme,
    pointerColor,
  } = props;
  const { isLoading, setError } = props;

  const spinButtonColor = config?.spinButtonColor || "#00a63e"; // Default button color
  const spinButtonTextColor = config?.spinButtonTextColor || "#FFFFFF"; //
  // State Management
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const [winningSegment, setWinningSegment] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  // --- Wheel Calculation Memos ---
  const segmentsExist = segments.length > 0;
  const segmentAngle = segmentsExist ? 360 / segments.length : 0;

  // Generate the conic-gradient background string for the wheel
  const wheelGradient = useMemo(() => {
    if (!segmentsExist) return "transparent";
    const parts = segments.map((seg, i) => {
      const colorTheme = config.colorThemes[wheelColorTheme];
      // Ensure no two consecutive segments have the same color
      let color;
      if (i === 0) {
        color = colorTheme[Math.floor(Math.random() * colorTheme.length)];
      } else {
        let prevColor = segments[i - 1]._assignedColor;
        const availableColors = colorTheme.filter((c) => c !== prevColor);
        color =
          availableColors[Math.floor(Math.random() * availableColors.length)];
      }
      // Store assigned color for next iteration
      seg._assignedColor = color;
      const start = i * segmentAngle;
      const end = (i + 1) * segmentAngle;
      return `${color} ${start}deg ${end}deg`;
    });
    // Offset the gradient so pointer is in the middle of a slice at 0deg rotation
    return `conic-gradient(from -${segmentAngle / 2}deg, ${parts.join(", ")})`;
  }, [segments, wheelColorTheme, segmentAngle, segmentsExist]);

  // --- Core Logic ---
  const handleSpinClick = async () => {
    if (isSpinning || !segmentsExist) return;
    setIsSpinning(true);
    setError(null);
    setWinningSegment(null);
    setIsCodeCopied(false);

    // Start an initial spin immediately
    setRotation(360 * 5); // Initial 2 rotations to show immediate feedback
    setRotation(0);
    try {
      // Fetch the winner while the wheel is doing its initial spin
      const winner = await fetchWinningOfferAPI({
        retailerMoniker: contextData.retailerMoniker,
        trackingNumber: contextData.trackingNumbers?.[0],
        carrier: contextData.carrier,
        orderNumber: contextData.orderNumbers?.[0],
      });
      setWinningSegment(winner);

      const winningIndex = segments.findIndex((s) => s.id === winner.id);

      // Reset rotation briefly - this creates a slight pause before final spin
      // setRotation(360 * 2);

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
      }, 1000); // Tiny timeout to ensure the DOM updates between rotation changes
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
      {/* Wheel Container */}
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
        {/* Pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 z-10"
          style={{
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: `30px solid ${pointerColor}`,
          }}
        ></div>

        {/* The Wheel */}
        <div
          className="relative w-full h-full rounded-full border-8 border-gray-700 shadow-2xl transition-transform ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: `${isSpinning ? config.spinDuration : 0}s`,
            background: wheelGradient,
          }}
        >
          {/* Segment Labels */}
          {segmentsExist &&
            segments.map((segment, index) => {
              const angleDeg = index * segmentAngle;
              const maxLabelLength = Math.round(28 - segments.length * 2);
              return (
                <div
                  key={segment.id}
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${angleDeg}deg)` }}
                >
                  <div
                    className="flex justify-center items-start h-1/2 pt-4 md:pt-6"
                    style={{ color: config.textColor }}
                  >
                    <span
                      className="text-sm md:text-base font-bold select-none text-center px-2"
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        maxWidth: `${maxLabelLength * 2.5}%`,
                        lineHeight: "1.2",
                      }}
                    >
                      {segment.label}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

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
        winningCoupon={winningSegment}
        showResultPopup={showResultPopup}
        setShowResultPopup={setShowResultPopup}
        isCodeCopied={isCodeCopied}
        setIsCodeCopied={setIsCodeCopied}
      />
    </>
  );
};

export default Wheel;
