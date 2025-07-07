import React, { useState, useEffect } from "react";
import { fetchOffersAPI } from "../apiClient";
import Wheel from "./wheel";
import SlotMachine from "./slotMachine";

const OfferSpinner = ({ config, context: contextData }) => {
  const colorTheme = config?.colorTheme || "default";
  const pointerColor = config?.pointerColor || "#B91C1C"; // Default pointer color

  // --- State Management ---
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching Effect ---
  useEffect(() => {
    const loadOffers = async () => {
      try {
        setError(null);
        console.log(
          "Fetching offers with retailerMoniker:",
          contextData.retailerMoniker
        );
        const offersData = await fetchOffersAPI({
          retailerMoniker: contextData.retailerMoniker,
          carrier: contextData.carrier,
          trackingNumber: contextData.trackingNumbers?.[0],
        });
        setOffers(offersData.slice(0, 9));
      } catch (err) {
        console.error("Failed to load offers:", err);
        setError("Could not load offers. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };
    loadOffers();
  }, []);

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 w-full bg-gray-100 rounded-lg">
        <p className="text-xl text-gray-600 animate-pulse">
          {config.text.loading}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center p-4 font-sans">
      {/* Error Message Display */}
      {error && (
        <div
          className="absolute -top-4 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center mb-4 z-20"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      {config.spinnerType === "slotMachine" ? (
        <SlotMachine
          config={config}
          contextData={contextData}
          offers={offers}
          colorTheme={colorTheme}
          pointerColor={pointerColor}
          isLoading={isLoading}
          setError={setError}
        />
      ) : (
        <Wheel
          config={config}
          contextData={contextData}
          offers={offers}
          wheelColorTheme={colorTheme}
          pointerColor={pointerColor}
          isLoading={isLoading}
          setError={setError}
        />
      )}
    </div>
  );
};

export default OfferSpinner;
