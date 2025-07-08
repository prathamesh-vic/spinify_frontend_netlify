import { initCustomComponent } from "./lib/cth";
import Spinner from "./spinner";
import { createRoot } from "react-dom/client";
import React from "react";

async function main() {
  // Create a container for React to render into
  const appElement = document.querySelector("#app");
  const root = createRoot(appElement);

  // Initialize component
  const component = await initCustomComponent({ syncHeight: true });

  // Access page context and settings
  const {
    state: { pageContext, settings },
  } = component;

  console.log("pageContext", pageContext);
  console.log("settings", settings);

  // Render the Spinner component using React
  const customConfig = {
    spinnerType: settings.spinnerType, // "wheel" or "slotMachine"
    colorTheme: settings.wheelColorTheme, // change the wheel color theme
    textColor: settings.textColor,
    text: {
      loading: settings.loadingText,
      spinButton: settings.spinButtonText,
      spinningButton: settings.spinningButtonText,
      popupTitleWinning: settings.popupTitleWinning,
      popupTitleLosing: settings.popupTitleLosing,
      popupSubtitleWinning: settings.popupSubtitleWinning,
      popupSubtitleLosing: settings.popupSubtitleLosing,
      copyButton: settings.copyButtonText,
      copiedButton: settings.copiedButtonText,
      closeButton: settings.closeButtonText,
      // Won Offers text
      wonOffersTitle: settings.wonOfferTitle,
      wonOffersSubtitle: settings.wonOfferSubtitle,
      wonOffersRedeemText: settings.wonOfferRedeemText,
      wonOffersNoOffersText: settings.wonOfferNoOffersText,
      wonOffersNoOffersSubtext: settings.wonOfferNoOffersSubtext,
      wonOffersBackToSpinnerText: settings.wonOfferBackToSpinner,
      // Spinner page text
      spinnerTitle: settings.spinnerViewTitle,
      spinnerSubtitle: settings.spinnerViewSubTitle,
      spinnerViewMyOffers: settings.spinnerViewViewMyOffers,
      // Result Popup text
      resultOfferCodeText: settings.resultPopupOfferCodeText,
    },
    pointerColor: settings.pointerColor,
    spinButtonColor: settings.spinButtonColor,
    spinButtonTextColor: settings.spinButtonTextColor,
    backgroundColor: settings.backgroundColor,
  };

  const contextData = {
    retailerMoniker: pageContext.retailerMoniker,
    carrier: pageContext.carrier,
    trackingNumbers: pageContext.trackingNumbers,
    orderNumbers: pageContext.orderNumbers,
    productCategory: pageContext.productCategory,
  };
  root.render(<Spinner config={customConfig} context={contextData} />);

  // Signal Content Loaded
  component.signalContentLoaded();
}

main().catch((error) => console.error(error));
