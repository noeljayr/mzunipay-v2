"use client";

import MzuniPay from "mzunipay-sdk-package";
import { useEffect, useState } from "react";

function page() {
  const [apiKey] = useState(
    "64276172f803193f6dfbab16e29a4fd97fc3e6c592634053a460dd32f4f6b958"
  );

  const handleSuccess = (response: any) => {
    console.log("Payment Successful!", response);
  };

  const handleError = (error: any) => {
    console.error("Payment Failed:", error.message);
  };

  useEffect(() => {
    const payment = new MzuniPay(apiKey);
    payment.renderForm(
      "paymentFormContainer", // ID of the container where the form will be mounted
      (response) => console.log("Payment Success:", response), // Success callback
      (error) => console.error("Payment Error:", error), // Error callback
      {
        buttonText: "Make Payment", 
        styles: {
          button: {
            backgroundColor: "#28a745",
          }
        }
      }
    );
  }, [apiKey]);

  return <div id="paymentFormContainer"></div>;
}

export default page;
