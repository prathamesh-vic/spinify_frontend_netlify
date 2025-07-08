const defaultConfig = {
  spinnerType: "wheel", // "wheel" or "slotMachine"
  colorThemes: {
    carnivalVibes: [
      "#FF4C4C", // Red
      "#FFA534", // Orange
      "#FFE347", // Yellow
      "#6BF178", // Lime
      "#42C5F5", // Sky Blue
      "#3B3BF5", // Indigo
      "#B84FFF", // Lavender
      "#FF6B9A", // Pink
      "#00C2A8",  // Teal,
      "#FFFFFF" // text color
    ],
    enchantedForest: [
      "#2C3E50", // Charcoal Blue (Like a deep evening sky)
      "#4A5C4D", // Forest Green (Deep, muted green of a canopy)
      "#8C7B75", // Stone Brown (Warm, earthy color of weathered stone)
      "#A3B18A", // Sage Green (Lighter, silvery-green of moss)
      "#D4A373", // Golden Ochre (Warm, earthy yellow accent)
      "#582F0E", // Deep Mahogany (Rich, dark reddish-brown for depth)
      "#7F5539", // Tawny (Mid-tone, warm brown)
      "#BDE0FE", // Misty Blue (A very light, soft blue accent)
      "#E0E1DD", // Parchment (A soft, off-white for highlights)
      "#F7F7F7"  // Text Color (A light, soft white for readability)
    ],
    pastelDream: [
      "#FAD2E1", // Soft Rose
      "#FFE0AC", // Light Peach
      "#E2F0CB", // Mint Green
      "#B5EAD7", // Aqua Mist
      "#C7CEEA", // Pastel Purple
      "#FFDAC1", // Blush
      "#D5AAFF", // Lavender Cream
      "#FFF5BA", // Light Lemon
      "#A0E7E5",  // Cotton Aqua
      "#000000"  // text color
    ],
    tropicalHeat: [
      "#FF6F59", // Sunset Coral
      "#FFB000", // Mango Yellow
      "#FFD166", // Pineapple
      "#06D6A0", // Palm Green
      "#118AB2", // Ocean Blue
      "#EF476F", // Hibiscus Red
      "#8338EC", // Exotic Orchid
      "#FB8500", // Papaya Orange
      "#3A86FF",  // Tropical Sky
      "#FFFFFF"  // text color
    ]
  },
  textColor: "#FFFFFF",
  text: {
    loading: "Loading Offers...",
    spinButton: "SPIN!",
    spinningButton: "Spinning...",
    popupTitle: "Congratulations!",
    popupSubtitleWinning: "You won:",
    popupSubtitleLosing: "Better luck next time!",
    copyButton: "Copy Code",
    copiedButton: "Copied!",
    closeButton: "Close",
  },
  spinDuration: 5, // in seconds
};

export default defaultConfig;
