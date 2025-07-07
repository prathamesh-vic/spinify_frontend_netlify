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
    <div className="bg-gray-50 min-h-screen w-full flex items-center justify-center p-4">
      {/* To use the default configuration, just render:
        <OfferSpinner />

        To customize it, pass the config prop:
      */}
      <OfferSpinner config={config} context={contextData} />
    </div>
  );
}
