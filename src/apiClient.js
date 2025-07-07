/**
 * Mocks fetching the list of available offers to display on the wheel.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of offer segments.
 */
const fetchOffersAPI = ({ retailerMoniker, carrier, trackingNumber }) => {
  console.log("Retailer Moniker:", retailerMoniker);
  console.log("Fetching offers from backend (GET API)...");

  // Build URL with query params
  const url = new URL("https://spinify-backend.onrender.com/api/v1/offers");
  if (carrier) url.searchParams.append("carrier", carrier);
  if (trackingNumber) url.searchParams.append("trackingNumber", trackingNumber);

  return fetch(url.toString(), {
    method: "GET",
    headers: {
      "Retailer-Moniker": retailerMoniker,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch offers from backend.");
      }
      return response.json();
    })
    .then((json) => {
      console.log("Offers fetched successfully:", json.data);
      const data = json.data;
      return data;
    });
};

/**
 * Mocks making a call to the backend to determine the winning offer.
 * The backend should handle the logic for a fair and secure prize award.
 * @param {Array<Object>} offers - The list of possible offers.
 * @returns {Promise<Object>} A promise that resolves with the winning offer object.
 */
/**
 * Calls the backend to determine the winning offer.
 * @param {Object} params - The parameters for the API call.
 * @param {string} params.trackingNumber
 * @param {string} params.orderNumber
 * @param {string} params.email
 * @param {string} params.phone
 * @returns {Promise<Object>} A promise that resolves with the winning offer object.
 */
const fetchWinningOfferAPI = ({
  retailerMoniker,
  trackingNumber,
  carrier,
  orderNumber,
}) => {
  console.log("Requesting winning offer from backend...");
  return fetch("https://spinify-backend.onrender.com/api/v1/winning_offer", {
    method: "POST",
    headers: {
      "Retailer-Moniker": retailerMoniker, // Replace with actual retailer moniker
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trackingNumber,
      carrier,
      orderNumber,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch winning offer from backend.");
      }
      return response.json();
    })
    .then((json) => {
      console.log("Winning offer received:", json);
      return json;
    });
};

export { fetchOffersAPI, fetchWinningOfferAPI };
