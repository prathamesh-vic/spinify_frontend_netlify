import React, { useState, useEffect } from "react";
import { fetchOffersAPI } from "../apiClient";
import Wheel from "./wheel";
import SlotMachine from "./slotMachine";
import WonOffers from "./wonOffers";

const OfferSpinner = ({ config, context: contextData }) => {
  const colorTheme = config?.colorTheme || "default";
  const pointerColor = config?.pointerColor || "#B91C1C"; // Default pointer color

  // --- State Management ---
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("spinner"); // "spinner" or "coupons"
  const [spinAllowed, setSpinAllowed] = useState(true);
  const [wonOffers, setWonOffers] = useState([]);

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
      setSpinAllowed(offersData["can_spin"]);
      setOffers(offersData["offers"].slice(0, 9));
      setWonOffers(offersData["won_offers"]);
    } catch (err) {
      console.error("Failed to load offers:", err);
      setError("Could not load offers. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Data Fetching Effect ---
  useEffect(() => {
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

      {currentView === "coupons" || !spinAllowed ? (
        <WonOffers
          config={config}
          contextData={contextData}
          wonCoupons={wonOffers}
          spinAllowed={spinAllowed}
          setCurrentView={setCurrentView}
        />
      ) : (
        <>
          {config.spinnerType === "slotMachine" ? (
            <SlotMachine
              config={config}
              contextData={contextData}
              offers={offers}
              colorTheme={colorTheme}
              pointerColor={pointerColor}
              isLoading={isLoading}
              setError={setError}
              setCurrentView={setCurrentView}
              updateOffers={loadOffers}
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
              setCurrentView={setCurrentView}
              updateOffers={loadOffers}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OfferSpinner;
