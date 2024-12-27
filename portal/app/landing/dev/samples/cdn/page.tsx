import React from "react";

function page() {
  return (
    <div className="result-html mb-8 pb-4 flex flex-col gap-2">
      <>
        <h1>MzuniPay SDK Examples with CDN Integration</h1>
        <h2>Overview</h2>
        <p>
          This guide demonstrates how to use the MzuniPay SDK with a CDN for
          easy integration into any web application. The examples include
          rendering a payment form and handling success and error callbacks.
        </p>
        <hr />
        <h2>Using the CDN</h2>
        <p>
          To use the SDK via a CDN, include the following{" "}
          <code>&lt;script&gt;</code> tag in your HTML file:
        </p>
        <pre className="hljs language-html">
          <code>
            <span className="hljs-tag">
              &lt;<span className="hljs-name">script</span>{" "}
              <span className="hljs-attr">src</span>=
              <span className="hljs-string">
                "https://cdn.jsdelivr.net/npm/mzunipay-sdk@1.0.37/dist/index.umd.js"
              </span>
              &gt;
            </span>
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">script</span>&gt;
            </span>
            {"\n"}
          </code>
        </pre>
        <p>
          The SDK is accessible globally as <code>MzunipaySDK</code> when loaded
          via the CDN.
        </p>
        <hr />
        <h2>Example Code</h2>
        <h3>Basic Example</h3>
        <p>
          Below is an example of rendering a payment form in your webpage using
          the CDN:
        </p>
        <pre className="hljs language-html">
          <code>
            <span className="hljs-meta">
              &lt;!DOCTYPE <span className="hljs-keyword">html</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">html</span>{" "}
              <span className="hljs-attr">lang</span>=
              <span className="hljs-string">"en"</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">head</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">meta</span>{" "}
              <span className="hljs-attr">charset</span>=
              <span className="hljs-string">"UTF-8"</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">meta</span>{" "}
              <span className="hljs-attr">name</span>=
              <span className="hljs-string">"viewport"</span>{" "}
              <span className="hljs-attr">content</span>=
              <span className="hljs-string">
                "width=device-width, initial-scale=1.0"
              </span>
              &gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">title</span>&gt;
            </span>
            MzuniPay Payment Example
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">title</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">script</span>{" "}
              <span className="hljs-attr">src</span>=
              <span className="hljs-string">
                "https://cdn.jsdelivr.net/npm/mzunipay-sdk@1.0.37/dist/index.umd.js"
              </span>
              &gt;
            </span>
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">script</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">head</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">body</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">h1</span>&gt;
            </span>
            Payment Example
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">h1</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">div</span>{" "}
              <span className="hljs-attr">id</span>=
              <span className="hljs-string">"payment-form-container"</span>&gt;
            </span>
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">div</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">script</span>&gt;
            </span>
            <span className="language-javascript">
              {"\n"}
              {"    "}
              <span className="hljs-comment">
                // Initialize MzuniPay with your API key
              </span>
              {"\n"}
              {"    "}
              <span className="hljs-keyword">const</span> mzuniPay ={" "}
              <span className="hljs-keyword">new</span>{" "}
              <span className="hljs-title class_">MzunipaySDK</span>(
              <span className="hljs-string">
                "your-api-key-here"
              </span>
              );{"\n"}
              {"\n"}
              {"    "}
              <span className="hljs-comment">// Render the styled form</span>
              {"\n"}
              {"    "}mzuniPay.
              <span className="hljs-title function_">renderForm</span>({"\n"}
              {"      "}
              <span className="hljs-string">"payment-form-container"</span>,
              {"\n"}
              {"      "}
              <span className="hljs-function">
                (<span className="hljs-params">response</span>) =&gt;
              </span>{" "}
              {"{"}
              {"\n"}
              {"        "}
              <span className="hljs-variable language_">console</span>.
              <span className="hljs-title function_">log</span>(
              <span className="hljs-string">"Payment Successful!"</span>,
              response);
              {"\n"}
              {"      "}
              {"}"},{"\n"}
              {"      "}
              <span className="hljs-function">
                (<span className="hljs-params">error</span>) =&gt;
              </span>{" "}
              {"{"}
              {"\n"}
              {"        "}
              <span className="hljs-variable language_">console</span>.
              <span className="hljs-title function_">error</span>(
              <span className="hljs-string">"Payment Failed!"</span>, error);
              {"\n"}
              {"      "}
              {"}"},{"\n"}
              {"      "}
              <span className="hljs-literal">true</span>,{" "}
              <span className="hljs-comment">// Enable default styling</span>
              {"\n"}
              {"      "}
              <span className="hljs-string">"Pay Now"</span>,{" "}
              <span className="hljs-comment">// Button text</span>
              {"\n"}
              {"      "}
              {"{"}
              {"\n"}
              {"        "}
              <span className="hljs-attr">amount</span>:{" "}
              <span className="hljs-number">150.00</span>,{" "}
              <span className="hljs-comment">// Pre-fill the amount field</span>
              {"\n"}
              {"        "}
              <span className="hljs-attr">description</span>:{" "}
              <span className="hljs-string">"Purchase of goods"</span>{" "}
              <span className="hljs-comment">
                // Pre-fill the description field
              </span>
              {"\n"}
              {"      "}
              {"}"}
              {"\n"}
              {"    "});{"\n"}
              {"  "}
            </span>
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">script</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">body</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">html</span>&gt;
            </span>
            {"\n"}
          </code>
        </pre>
        <hr />
        <h3>Advanced Example with Custom Styles</h3>
        <p>
          You can customize the appearance of the form using the{" "}
          <code>styles</code> parameter. Here’s an example:
        </p>
        <pre className="hljs language-html">
          <code>
            <span className="hljs-meta">
              &lt;!DOCTYPE <span className="hljs-keyword">html</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">html</span>{" "}
              <span className="hljs-attr">lang</span>=
              <span className="hljs-string">"en"</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">head</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">meta</span>{" "}
              <span className="hljs-attr">charset</span>=
              <span className="hljs-string">"UTF-8"</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">meta</span>{" "}
              <span className="hljs-attr">name</span>=
              <span className="hljs-string">"viewport"</span>{" "}
              <span className="hljs-attr">content</span>=
              <span className="hljs-string">
                "width=device-width, initial-scale=1.0"
              </span>
              &gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">title</span>&gt;
            </span>
            Customized Payment Form
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">title</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">script</span>{" "}
              <span className="hljs-attr">src</span>=
              <span className="hljs-string">
                "https://cdn.jsdelivr.net/npm/mzunipay-sdk@1.0.37/dist/index.umd.js"
              </span>
              &gt;
            </span>
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">script</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">head</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">body</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">h1</span>&gt;
            </span>
            Customized Payment Form Example
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">h1</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">div</span>{" "}
              <span className="hljs-attr">id</span>=
              <span className="hljs-string">"payment-form-container"</span>&gt;
            </span>
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">div</span>&gt;
            </span>
            {"\n"}
            {"  "}
            <span className="hljs-tag">
              &lt;<span className="hljs-name">script</span>&gt;
            </span>
            <span className="language-javascript">
              {"\n"}
              {"    "}
              <span className="hljs-comment">
                // Initialize MzuniPay with your API key
              </span>
              {"\n"}
              {"    "}
              <span className="hljs-keyword">const</span> mzuniPay ={" "}
              <span className="hljs-keyword">new</span>{" "}
              <span className="hljs-title class_">MzunipaySDK</span>(
              <span className="hljs-string">
                "your-api-key-here"
              </span>
              );{"\n"}
              {"\n"}
              {"    "}
              <span className="hljs-comment">
                // Render the form with custom styles
              </span>
              {"\n"}
              {"    "}mzuniPay.
              <span className="hljs-title function_">renderForm</span>({"\n"}
              {"      "}
              <span className="hljs-string">"payment-form-container"</span>,
              {"\n"}
              {"      "}
              <span className="hljs-function">
                (<span className="hljs-params">response</span>) =&gt;
              </span>{" "}
              {"{"}
              {"\n"}
              {"        "}
              <span className="hljs-variable language_">console</span>.
              <span className="hljs-title function_">log</span>(
              <span className="hljs-string">"Payment Successful!"</span>,
              response);
              {"\n"}
              {"      "}
              {"}"},{"\n"}
              {"      "}
              <span className="hljs-function">
                (<span className="hljs-params">error</span>) =&gt;
              </span>{" "}
              {"{"}
              {"\n"}
              {"        "}
              <span className="hljs-variable language_">console</span>.
              <span className="hljs-title function_">error</span>(
              <span className="hljs-string">"Payment Failed!"</span>, error);
              {"\n"}
              {"      "}
              {"}"},{"\n"}
              {"      "}
              {"{"}
              {"\n"}
              {"        "}
              <span className="hljs-attr">styled</span>:{" "}
              <span className="hljs-literal">true</span>,{" "}
              <span className="hljs-comment">// Enable styling</span>
              {"\n"}
              {"        "}
              <span className="hljs-attr">buttonText</span>:{" "}
              <span className="hljs-string">"Submit Payment"</span>,{" "}
              <span className="hljs-comment">// Custom button text</span>
              {"\n"}
              {"        "}
              <span className="hljs-attr">styles</span>: {"{"}
              {"\n"}
              {"          "}
              <span className="hljs-attr">form</span>: {"{"}{" "}
              <span className="hljs-attr">backgroundColor</span>:{" "}
              <span className="hljs-string">"#f9f9f9"</span>,{" "}
              <span className="hljs-attr">padding</span>:{" "}
              <span className="hljs-string">"10px"</span>,{" "}
              <span className="hljs-attr">borderRadius</span>:{" "}
              <span className="hljs-string">"8px"</span> {"}"},{"\n"}
              {"          "}
              <span className="hljs-attr">input</span>: {"{"}{" "}
              <span className="hljs-attr">border</span>:{" "}
              <span className="hljs-string">"1px solid #ddd"</span>,{" "}
              <span className="hljs-attr">padding</span>:{" "}
              <span className="hljs-string">"8px"</span>,{" "}
              <span className="hljs-attr">fontSize</span>:{" "}
              <span className="hljs-string">"14px"</span> {"}"},{"\n"}
              {"          "}
              <span className="hljs-attr">button</span>: {"{"}{" "}
              <span className="hljs-attr">backgroundColor</span>:{" "}
              <span className="hljs-string">"#007bff"</span>,{" "}
              <span className="hljs-attr">color</span>:{" "}
              <span className="hljs-string">"#fff"</span>,{" "}
              <span className="hljs-attr">padding</span>:{" "}
              <span className="hljs-string">"10px 20px"</span>,{" "}
              <span className="hljs-attr">fontSize</span>:{" "}
              <span className="hljs-string">"16px"</span> {"}"},{"\n"}
              {"        "}
              {"}"},{"\n"}
              {"      "}
              {"}"}
              {"\n"}
              {"    "});{"\n"}
              {"  "}
            </span>
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">script</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">body</span>&gt;
            </span>
            {"\n"}
            <span className="hljs-tag">
              &lt;/<span className="hljs-name">html</span>&gt;
            </span>
            {"\n"}
          </code>
        </pre>
        <hr />
        <h2>Notes</h2>
        <ol>
          <li>
            Replace the API key (
            <code>your-api-key-here</code>) with your actual
            API key.
          </li>
          <li>
            Ensure the container ID (e.g., <code>payment-form-container</code>)
            matches the ID used in your HTML file.
          </li>
          <li>
            Use the <code>onSuccess</code> and <code>onError</code> callbacks to
            handle payment results effectively.
          </li>
          <li>
            The <code>renderForm</code> method automatically handles validation
            and submission to the backend.
          </li>
        </ol>
      </>
    </div>
  );
}

export default page;
