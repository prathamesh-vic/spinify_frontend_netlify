import React, { useState } from "react";
import CloseIcon from "./closeIcon";
import CopyIcon from "./copyIcon";

const ResultPopUp = (props) => {
  console.log("ResultPopUp component rendered with props:", props);
  const { config, winningCoupon, showResultPopup } = props;
  const { isCodeCopied, setIsCodeCopied, setShowResultPopup } = props;

  const isWinner = winningCoupon && winningCoupon.offerCode != "BLNT";
  console.log(winningCoupon);
  const handleCopyCode = () => {
    if (!isWinner) return;
    const textArea = document.createElement("textarea");
    textArea.value = winningCoupon.couponCode;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setIsCodeCopied(true);
      setTimeout(() => {
        setIsCodeCopied(false);
        setShowResultPopup(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
      alert("Failed to copy code.");
    }
    document.body.removeChild(textArea);
  };

  const handleClosePopup = () => {
    setShowResultPopup(false);
  };

  return (
    <>
      {showResultPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full border-t-4 border-green-400 transform scale-100 animate-zoom-in">
            {isWinner && (
              <span
                className="text-7xl mb-4 block"
                role="img"
                aria-label="Trophy"
              >
                🏆
              </span>
            )}
            <h2 className="text-3xl font-bold text-green-400 mb-2">
              {isWinner
                ? config.text.popupTitleWinning
                : config.text.popupTitleLosing}
            </h2>
            <p className="text-gray-300 mb-6">
              {isWinner
                ? config.text.popupSubtitleWinning
                : config.text.popupSubtitleLosing}
              {winningCoupon.label}
              {/* Congratulations! Use this code for 25% off your next purchase. */}
            </p>

            {isWinner ? (
              <div className="bg-gray-700/50 border-2 border-dashed border-green-400 rounded-lg py-3 px-4 mb-6">
                <p className="text-gray-400 text-sm">Your Offer Code:</p>
                <p className="text-white text-2xl font-mono font-bold tracking-widest">
                  {winningCoupon.offerCode}
                </p>
              </div>
            ) : (
              <div className="my-4 text-5xl">☹️</div>
            )}

            {isWinner && (
              <button
                onClick={handleCopyCode}
                className={`w-full flex items-center justify-center gap-2 my-2 px-6 py-3 rounded-lg text-lg font-semibold transition-all ${
                  isCodeCopied
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <CopyIcon className="w-5 h-5" />
                {isCodeCopied
                  ? config.text.copiedButton
                  : config.text.copyButton}
              </button>
            )}

            <button
              onClick={handleClosePopup}
              className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 transform hover:scale-105"
            >
              {config.text.closeButton}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultPopUp;
