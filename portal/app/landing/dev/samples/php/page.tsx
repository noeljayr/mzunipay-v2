import React from "react";

function page() {
  return (
    <div className="result-html mb-8 pb-4 flex flex-col gap-2">
      <>
        <h1>Using the SDK with PHP</h1>
        <p>
          PHP is a backend language, so it won’t directly render the JavaScript
          SDK. However, you can embed the SDK in your front-end views and pass
          data dynamically from PHP.
        </p>
        <ol>
          <li>
            <p>
              <strong>Include SDK via CDN</strong>: Add the SDK script in your
              front-end HTML/PHP template.
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
          </li>
          <li>
            <p>
              <strong>Dynamic Data Injection</strong>: Use PHP to inject dynamic
              values into your JavaScript:
            </p>
            <pre className="hljs language-php">
              <code>
                <span className="hljs-meta">&lt;?php</span>
                {"\n"}
                <span className="hljs-variable">$apiKey</span> ={" "}
                <span className="hljs-string">"your-api-key-here"</span>;{"\n"}
                <span className="hljs-variable">$amount</span> ={" "}
                <span className="hljs-number">150.00</span>;{"\n"}
                <span className="hljs-variable">$description</span> ={" "}
                <span className="hljs-string">"Payment for Order #123"</span>;
                {"\n"}
                <span className="hljs-meta">?&gt;</span>
                {"\n"}&lt;html&gt;{"\n"}&lt;head&gt;{"\n"}
                {"  "}&lt;script src=
                <span className="hljs-string">
                  "https://cdn.jsdelivr.net/npm/mzunipay-sdk/dist/index.umd.js"
                </span>
                &gt;&lt;/script&gt;{"\n"}&lt;/head&gt;{"\n"}&lt;body&gt;{"\n"}
                {"  "}&lt;h1&gt;Payment Form&lt;/h1&gt;{"\n"}
                {"  "}&lt;div id=
                <span className="hljs-string">"payment-form-container"</span>
                &gt;&lt;/div&gt;{"\n"}
                {"  "}&lt;script&gt;{"\n"}
                {"    "}
                <span className="hljs-keyword">const</span>{" "}
                <span className="hljs-variable constant_">mzuniPay</span> ={" "}
                <span className="hljs-keyword">new</span>{" "}
                <span className="hljs-title class_">MzuniPay</span>(
                <span className="hljs-string">
                  "&lt;?php echo <span className="hljs-subst">$apiKey</span>;
                  ?&gt;"
                </span>
                );{"\n"}
                {"\n"}
                {"    "}mzuniPay.
                <span className="hljs-title function_ invoke__">
                  renderForm
                </span>
                ({"\n"}
                {"      "}
                <span className="hljs-string">"payment-form-container"</span>,
                {"\n"}
                {"      "}(response) =&gt; {"{"}
                {"\n"}
                {"        "}console.
                <span className="hljs-title function_ invoke__">log</span>(
                <span className="hljs-string">"Payment Successful!"</span>,
                response);
                {"\n"}
                {"      "}
                {"}"},{"\n"}
                {"      "}(error) =&gt; {"{"}
                {"\n"}
                {"        "}console.
                <span className="hljs-title function_ invoke__">error</span>(
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
                {"        "}amount: <span className="hljs-meta">&lt;?php</span>{" "}
                <span className="hljs-keyword">echo</span>{" "}
                <span className="hljs-variable">$amount</span>;{" "}
                <span className="hljs-meta">?&gt;</span>,{"\n"}
                {"        "}description:{" "}
                <span className="hljs-string">
                  "&lt;?php echo{" "}
                  <span className="hljs-subst">$description</span>; ?&gt;"
                </span>
                ,{"\n"}
                {"      "}
                {"}"}
                {"\n"}
                {"    "});{"\n"}
                {"  "}&lt;/script&gt;{"\n"}&lt;/body&gt;{"\n"}&lt;/html&gt;
                {"\n"}
              </code>
            </pre>
          </li>
        </ol>
      </>
    </div>
  );
}

export default page;
