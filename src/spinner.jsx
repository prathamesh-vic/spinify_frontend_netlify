import React, { useMemo } from "react";
import OfferSpinner from "./components/offerSpinner";
import defaultConfig from "./defaultConfig";

export default function Spinner({
  config: customConfig,
  context: contextData,
}) {
  console.log("Spinner component rendered with config:", customConfig);

  // Merge user config with default config
  const config = useMemo(
    () => ({
      ...defaultConfig,
      ...customConfig,
      colorThemes: {
        ...defaultConfig.colorThemes,
        ...customConfig?.colorThemes,
      },
      text: { ...defaultConfig.text, ...customConfig?.text },
    }),
    [customConfig, defaultConfig]
  );
  return (
    <div
      className="w-full flex items-center justify-center p-4 hide-scrollbar"
      style={{
        backgroundColor: config.backgroundColor || "#111826",
        overflow: "hidden",
      }}
    >
      {/* To use the default configuration, just render:
        <OfferSpinner />

        To customize it, pass the config prop:
      */}
      <OfferSpinner config={config} context={contextData} />

      {/* Custom CSS for Animations and iframe fix */}
      <style jsx="true" global="true">{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
