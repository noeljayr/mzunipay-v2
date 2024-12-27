import React from "react";

function page() {
  return (
    <div className="result-html mb-8 pb-4 flex flex-col gap-2">
      <>
        <h1>MzuniPay SDK Examples with Vue.js</h1>
        <h2>Overview</h2>
        <p>
          This guide provides examples of how to integrate the MzuniPay SDK into
          a Vue.js application. The examples demonstrate rendering a payment
          form, handling success and error callbacks, and customizing the form.
        </p>
        <hr />
        <h2>Installation</h2>
        <p>First, install the MzuniPay SDK in your Vue.js project:</p>
        <pre className="hljs language-bash">
          <code>npm install mzunipay{"\n"}</code>
        </pre>
        <hr />
        <h2>Example Code</h2>
        <h3>Basic Integration</h3>
        <p>
          Below is an example of integrating the payment form into a Vue
          component:
        </p>
        <pre>
          <code className="hljs">
            &lt;template&gt;{"\n"}
            {"  "}&lt;div&gt;{"\n"}
            {"    "}&lt;h1&gt;Payment Form&lt;/h1&gt;{"\n"}
            {"    "}&lt;div id="payment-form-container"&gt;&lt;/div&gt;{"\n"}
            {"  "}&lt;/div&gt;{"\n"}&lt;/template&gt;{"\n"}
            {"\n"}&lt;script&gt;{"\n"}import MzuniPay from "mzunipay";{"\n"}
            {"\n"}export default {"{"}
            {"\n"}
            {"  "}name: "PaymentForm",{"\n"}
            {"  "}mounted() {"{"}
            {"\n"}
            {"    "}const mzuniPay = new MzuniPay("your-api-key-here");{"\n"}
            {"\n"}
            {"    "}mzuniPay.renderForm({"\n"}
            {"      "}"payment-form-container", // ID of the container element
            {"\n"}
            {"      "}(response) =&gt; {"{"}
            {"\n"}
            {"        "}console.log("Payment Successful!", response);{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}(error) =&gt; {"{"}
            {"\n"}
            {"        "}console.error("Payment Failed!", error);{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}true, // Enable default styling{"\n"}
            {"      "}"Pay Now", // Button text{"\n"}
            {"      "}
            {"{"}
            {"\n"}
            {"        "}amount: 150.0, // Pre-fill the amount field{"\n"}
            {"        "}description: "Payment for goods", // Pre-fill the
            description field{"\n"}
            {"      "}
            {"}"}
            {"\n"}
            {"    "});{"\n"}
            {"  "}
            {"}"},{"\n"}
            {"}"};{"\n"}&lt;/script&gt;{"\n"}
          </code>
        </pre>
        <hr />
        <h3>Advanced Example with Custom Styles</h3>
        <p>
          You can customize the form by passing additional style options to the{" "}
          <code>renderForm</code> method. Here’s an example:
        </p>
        <pre>
          <code className="hljs">
            &lt;template&gt;{"\n"}
            {"  "}&lt;div&gt;{"\n"}
            {"    "}&lt;h1&gt;Customized Payment Form&lt;/h1&gt;{"\n"}
            {"    "}&lt;div id="payment-form-container"&gt;&lt;/div&gt;{"\n"}
            {"  "}&lt;/div&gt;{"\n"}&lt;/template&gt;{"\n"}
            {"\n"}&lt;script&gt;{"\n"}import MzuniPay from "mzunipay";{"\n"}
            {"\n"}export default {"{"}
            {"\n"}
            {"  "}name: "CustomizedPaymentForm",{"\n"}
            {"  "}mounted() {"{"}
            {"\n"}
            {"    "}const mzuniPay = new MzuniPay("your-api-key-here");{"\n"}
            {"\n"}
            {"    "}mzuniPay.renderForm({"\n"}
            {"      "}"payment-form-container", // ID of the container element
            {"\n"}
            {"      "}(response) =&gt; {"{"}
            {"\n"}
            {"        "}console.log("Payment Successful!", response);{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}(error) =&gt; {"{"}
            {"\n"}
            {"        "}console.error("Payment Failed!", error);{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}true, // Enable default styling{"\n"}
            {"      "}"Submit Payment", // Custom button text{"\n"}
            {"      "}
            {"{"}
            {"\n"}
            {"        "}amount: 200.0, // Pre-fill the amount field{"\n"}
            {"        "}description: "Order #1234", // Pre-fill the description
            field
            {"\n"}
            {"        "}styles: {"{"}
            {"\n"}
            {"          "}form: {"{"} backgroundColor: "#f9f9f9", padding:
            "20px", borderRadius: "8px" {"}"},{"\n"}
            {"          "}input: {"{"} padding: "10px", border: "1px solid #ddd"{" "}
            {"}"},{"\n"}
            {"          "}button: {"{"} backgroundColor: "#007bff", color:
            "#fff", padding: "10px 20px" {"}"},{"\n"}
            {"        "}
            {"}"},{"\n"}
            {"      "}
            {"}"}
            {"\n"}
            {"    "});{"\n"}
            {"  "}
            {"}"},{"\n"}
            {"}"};{"\n"}&lt;/script&gt;{"\n"}
          </code>
        </pre>
        <hr />
        <h3>Rendering Multiple Forms</h3>
        <p>
          You can render multiple payment forms in different parts of your
          application by using unique container IDs for each form. Here’s an
          example:
        </p>
        <pre>
          <code className="hljs">
            &lt;template&gt;{"\n"}
            {"  "}&lt;div&gt;{"\n"}
            {"    "}&lt;h1&gt;Product A&lt;/h1&gt;{"\n"}
            {"    "}&lt;div id="form1-container"&gt;&lt;/div&gt;{"\n"}
            {"\n"}
            {"    "}&lt;h1&gt;Product B&lt;/h1&gt;{"\n"}
            {"    "}&lt;div id="form2-container"&gt;&lt;/div&gt;{"\n"}
            {"  "}&lt;/div&gt;{"\n"}&lt;/template&gt;{"\n"}
            {"\n"}&lt;script&gt;{"\n"}import MzuniPay from "mzunipay";{"\n"}
            {"\n"}export default {"{"}
            {"\n"}
            {"  "}name: "MultiFormPage",{"\n"}
            {"  "}mounted() {"{"}
            {"\n"}
            {"    "}const mzuniPay = new MzuniPay("your-api-key-here");{"\n"}
            {"\n"}
            {"    "}mzuniPay.renderForm({"\n"}
            {"      "}"form1-container",{"\n"}
            {"      "}(response) =&gt; {"{"}
            {"\n"}
            {"        "}console.log("Form 1 Payment Successful!", response);
            {"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}(error) =&gt; {"{"}
            {"\n"}
            {"        "}console.error("Form 1 Payment Failed!", error);{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}true,{"\n"}
            {"      "}"Pay for Product A",{"\n"}
            {"      "}
            {"{"} amount: 100.0, description: "Product A" {"}"}
            {"\n"}
            {"    "});{"\n"}
            {"\n"}
            {"    "}mzuniPay.renderForm({"\n"}
            {"      "}"form2-container",{"\n"}
            {"      "}(response) =&gt; {"{"}
            {"\n"}
            {"        "}console.log("Form 2 Payment Successful!", response);
            {"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}(error) =&gt; {"{"}
            {"\n"}
            {"        "}console.error("Form 2 Payment Failed!", error);{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}true,{"\n"}
            {"      "}"Pay for Product B",{"\n"}
            {"      "}
            {"{"} amount: 200.0, description: "Product B" {"}"}
            {"\n"}
            {"    "});{"\n"}
            {"  "}
            {"}"},{"\n"}
            {"}"};{"\n"}&lt;/script&gt;{"\n"}
          </code>
        </pre>
        <hr />
        <h2>Notes</h2>
        <ol>
          <li>
            Replace the API key (<code>your-api-key-here</code>) with your
            actual API key.
          </li>
          <li>
            Ensure that the container IDs (e.g.,{" "}
            <code>payment-form-container</code>) are unique and exist in the
            DOM.
          </li>
          <li>
            Use the <code>onSuccess</code> and <code>onError</code> callbacks to
            handle payment results effectively.
          </li>
        </ol>
      </>
    </div>
  );
}

export default page;
