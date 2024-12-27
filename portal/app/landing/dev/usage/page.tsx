import React from "react";

function page() {
  return (
    <div className="result-html mb-8 pb-4 flex flex-col gap-2">
      <>
        <h1>MzuniPay SDK Documentation</h1>
        <h2>Overview</h2>
        <p>
          MzuniPay SDK allows developers to easily integrate a payment form into
          their projects. The SDK handles the rendering of the form, form
          submission, and communication with the backend API for processing
          payments.
        </p>
        <hr />
        <h2>Installation</h2>
        <pre className="hljs language-bash">
          <code>npm install mzunipay{"\n"}</code>
        </pre>
        <hr />
        <h2>Getting Started</h2>
        <h3>Importing the SDK</h3>
        <pre className="hljs language-javascript">
          <code>
            <span className="hljs-keyword">import</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>{" "}
            <span className="hljs-keyword">from</span>{" "}
            <span className="hljs-string">'mzunipay'</span>;{"\n"}
          </code>
        </pre>
        <h3>Instantiating MzuniPay</h3>
        <p>To use MzuniPay, instantiate it with your API key:</p>
        <pre className="hljs language-javascript">
          <code>
            <span className="hljs-keyword">const</span> mzuniPay ={" "}
            <span className="hljs-keyword">new</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>(
            <span className="hljs-string">"your-api-key-here"</span>);{"\n"}
          </code>
        </pre>
        <h3>Rendering the Payment Form</h3>
        <p>To render the payment form:</p>
        <pre className="hljs language-javascript">
          <code>
            mzuniPay.<span className="hljs-title function_">renderForm</span>(
            {"\n"}
            {"  "}
            <span className="hljs-string">"container-id"</span>,{" "}
            <span className="hljs-comment">// ID of the container element</span>
            {"\n"}
            {"  "}
            <span className="hljs-function">
              (<span className="hljs-params">response</span>) =&gt;
            </span>{" "}
            {"{"} <span className="hljs-variable language_">console</span>.
            <span className="hljs-title function_">log</span>(
            <span className="hljs-string">"Payment successful!"</span>,
            response); {"}"},{" "}
            <span className="hljs-comment">// Success callback</span>
            {"\n"}
            {"  "}
            <span className="hljs-function">
              (<span className="hljs-params">error</span>) =&gt;
            </span>{" "}
            {"{"} <span className="hljs-variable language_">console</span>.
            <span className="hljs-title function_">error</span>(
            <span className="hljs-string">"Payment failed!"</span>, error);{" "}
            {"}"}, <span className="hljs-comment">// Error callback</span>
            {"\n"}
            {"  "}
            <span className="hljs-literal">true</span>,{" "}
            <span className="hljs-comment">// Styled form (true/false)</span>
            {"\n"}
            {"  "}
            <span className="hljs-string">"Pay Now"</span>,{" "}
            <span className="hljs-comment">// Custom button text</span>
            {"\n"}
            {"  "}
            {"{"} <span className="hljs-attr">amount</span>:{" "}
            <span className="hljs-number">100.50</span>,{" "}
            <span className="hljs-attr">description</span>:{" "}
            <span className="hljs-string">"Payment for services"</span> {"}"}{" "}
            <span className="hljs-comment">// Default values for inputs</span>
            {"\n"});{"\n"}
          </code>
        </pre>
        <hr />
        <h2>API Reference</h2>
        <h3>Constructor</h3>
        <h4>
          <code>MzuniPay(apiKey: string)</code>
        </h4>
        <p>Creates an instance of the MzuniPay class.</p>
        <ul>
          <li>
            <strong>Parameters:</strong>
            <ul>
              <li>
                <code>apiKey</code> (string): Your API key for authentication.
              </li>
            </ul>
          </li>
          <li>
            <strong>Throws:</strong> An error if the API key is not provided.
          </li>
        </ul>
        <hr />
        <h3>Methods</h3>
        <h4>
          <code>processPayment(paymentData: object): Promise&lt;any&gt;</code>
        </h4>
        <p>Processes a payment by communicating with the backend API.</p>
        <ul>
          <li>
            <strong>Parameters:</strong>
            <ul>
              <li>
                <code>paymentData</code> (object): The payment details.
                <ul>
                  <li>
                    <code>customer_email</code> (string): The customer’s email.
                  </li>
                  <li>
                    <code>password</code> (string): The customer’s password.
                  </li>
                  <li>
                    <code>amount</code> (number): The payment amount.
                  </li>
                  <li>
                    <code>description</code> (string, optional): A description
                    of the payment.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>Returns:</strong>
            <ul>
              <li>A promise that resolves with the payment response.</li>
            </ul>
          </li>
          <li>
            <strong>Throws:</strong> An error if the payment fails.
          </li>
        </ul>
        <h4>
          <code>
            renderForm(containerId: string, onSuccess: Function, onError:
            Function, styled?: boolean, buttonText?: string, defaultValues?:
            object): void
          </code>
        </h4>
        <p>Renders the payment form inside the specified container element.</p>
        <ul>
          <li>
            <strong>Parameters:</strong>
            <ul>
              <li>
                <code>containerId</code> (string): The ID of the container
                element to render the form into.
              </li>
              <li>
                <code>onSuccess</code> (Function): Callback function invoked
                upon successful payment.
              </li>
              <li>
                <code>onError</code> (Function): Callback function invoked upon
                payment failure.
              </li>
              <li>
                <code>styled</code> (boolean, optional): Whether the form should
                be styled (default: <code>true</code>).
              </li>
              <li>
                <code>buttonText</code> (string, optional): Custom text for the
                submit button (default: <code>"Pay Now"</code>).
              </li>
              <li>
                <code>defaultValues</code> (object, optional): Default values
                for input fields.
                <ul>
                  <li>
                    <code>amount</code> (number, optional): Default value for
                    the amount input.
                  </li>
                  <li>
                    <code>description</code> (string, optional): Default value
                    for the description input.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <hr />
        <h2>Customization Options</h2>
        <p>
          The <code>renderForm</code> method allows developers to customize the
          payment form. The table below lists the available options:
        </p>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Option</strong>
              </th>
              <th>
                <strong>Type</strong>
              </th>
              <th>
                <strong>Default</strong>
              </th>
              <th>
                <strong>Description</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>styled</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>Whether to render the form with default styles.</td>
            </tr>
            <tr>
              <td>
                <code>buttonText</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>"Pay Now"</code>
              </td>
              <td>Custom text for the submit button.</td>
            </tr>
            <tr>
              <td>
                <code>defaultValues</code>
              </td>
              <td>
                <code>object</code>
              </td>
              <td>
                <code>
                  {"{"}
                  {"}"}
                </code>
              </td>
              <td>Default values for input fields.</td>
            </tr>
            <tr>
              <td>
                <code>defaultValues.amount</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>undefined</code>
              </td>
              <td>Pre-fill the amount input with a specific value.</td>
            </tr>
            <tr>
              <td>
                <code>defaultValues.description</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>undefined</code>
              </td>
              <td>Pre-fill the description input with a specific value.</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h2>Example</h2>
        <p>Here’s a complete example of using MzuniPay:</p>
        <pre className="hljs language-javascript">
          <code>
            <span className="hljs-keyword">import</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>{" "}
            <span className="hljs-keyword">from</span>{" "}
            <span className="hljs-string">'mzunipay'</span>;{"\n"}
            {"\n"}
            <span className="hljs-keyword">const</span> mzuniPay ={" "}
            <span className="hljs-keyword">new</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>(
            <span className="hljs-string">"your-api-key"</span>);{"\n"}
            {"\n"}mzuniPay.
            <span className="hljs-title function_">renderForm</span>({"\n"}
            {"  "}
            <span className="hljs-string">"payment-container"</span>,{"\n"}
            {"  "}
            <span className="hljs-function">
              (<span className="hljs-params">response</span>) =&gt;
            </span>{" "}
            {"{"}
            {"\n"}
            {"    "}
            <span className="hljs-variable language_">console</span>.
            <span className="hljs-title function_">log</span>(
            <span className="hljs-string">"Payment was successful!"</span>,
            response);
            {"\n"}
            {"  "}
            {"}"},{"\n"}
            {"  "}
            <span className="hljs-function">
              (<span className="hljs-params">error</span>) =&gt;
            </span>{" "}
            {"{"}
            {"\n"}
            {"    "}
            <span className="hljs-variable language_">console</span>.
            <span className="hljs-title function_">error</span>(
            <span className="hljs-string">"Payment failed!"</span>, error);
            {"\n"}
            {"  "}
            {"}"},{"\n"}
            {"  "}
            <span className="hljs-literal">true</span>,{" "}
            <span className="hljs-comment">// Render a styled form</span>
            {"\n"}
            {"  "}
            <span className="hljs-string">"Complete Payment"</span>,{" "}
            <span className="hljs-comment">// Custom button text</span>
            {"\n"}
            {"  "}
            {"{"}
            {"\n"}
            {"    "}
            <span className="hljs-attr">amount</span>:{" "}
            <span className="hljs-number">500.00</span>,{"\n"}
            {"    "}
            <span className="hljs-attr">description</span>:{" "}
            <span className="hljs-string">"Order #12345"</span>,{"\n"}
            {"  "}
            {"}"} <span className="hljs-comment">// Pre-fill input values</span>
            {"\n"});{"\n"}
          </code>
        </pre>
        <hr />
        <h2>Error Handling</h2>
        <p>
          If an error occurs during payment processing, the <code>onError</code>{" "}
          callback is triggered with the error details. You can use this to
          display an error message to the user or log it for debugging.
        </p>
        <hr />
        <h2>Notes</h2>
        <ul>
          <li>
            Ensure that the container element specified by{" "}
            <code>containerId</code> exists in the DOM before calling{" "}
            <code>renderForm</code>.
          </li>
          <li>
            Use secure practices when handling API keys and sensitive customer
            data.
          </li>
        </ul>
      </>
    </div>
  );
}

export default page;
