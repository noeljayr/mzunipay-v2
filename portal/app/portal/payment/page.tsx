"use client";

import MzuniPay from "mzunipay-sdk";
import { useEffect, useState } from "react";

function page() {
  const [apiKey] = useState("29b1241e-3e81-414e-aad4-e38ec6382900");

  const handleSuccess = (response: any) => {
    console.log("Payment Successful!", response);
  };

  const handleError = (error: any) => {
    console.error("Payment Failed:", error.message);
  };

  useEffect(() => {
    const payment = new MzuniPay(apiKey);
    payment.renderPlainForm(
      "paymentFormContainer", // ID of the container where the form will be mounted
      (response) => console.log("Payment Success:", response), // Success callback
      (error) => console.error("Payment Error:", error) // Error callback
    );
  }, [apiKey]);

  return <div id="paymentFormContainer"></div>;
}

export default page;
