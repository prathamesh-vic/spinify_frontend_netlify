import React, { useState, useMemo } from "react";

const WonOffers = (props) => {
  const { config, contextData, spinAllowed, setCurrentView } = props;
  const { wonCoupons } = props;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };
  return (
    <>
      <div className="font-sans bg-gray-900 flex flex-col items-center justify-center p-4 text-white antialiased">
        <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border-t-4 border-blue-400">
          <header className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-400 tracking-wider">
              MY COUPONS
            </h1>
            <p className="text-gray-400 mt-2">
              Here are all the awesome deals you've won!
            </p>
          </header>
          <main>
            {wonCoupons.length > 0 ? (
              <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {wonCoupons.map((coupon) => (
                  <li
                    key={coupon.externalId}
                    className="bg-gray-700/80 p-4 rounded-lg flex justify-between items-center shadow-md"
                  >
                    <div>
                      <p className="text-white font-mono font-bold text-lg tracking-wider">
                        {coupon.offerCode}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Expires on: {formatDate(coupon.expiry)}
                      </p>
                    </div>
                    <a
                      href={coupon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-400 transition-colors text-sm"
                    >
                      Redeem
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center bg-gray-700/50 rounded-lg p-8 my-4">
                <span
                  className="text-6xl mb-4 block"
                  role="img"
                  aria-label="Sad face"
                >
                  😟
                </span>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  No Coupons Yet!
                </h3>
                <p className="text-gray-400">
                  You haven't won any coupons. <br /> Go back and try your luck
                  on the slot machine!
                </p>
              </div>
            )}
          </main>
          {spinAllowed && (
            <button
              onClick={() => setCurrentView("spinner")}
              className="mt-6 w-full text-center text-blue-400 hover:text-blue-300 transition"
            >
              ‹ Back to Spinner
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default WonOffers;
