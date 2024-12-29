function Dev() {
  return (
    <div className="result-html mb-8 pb-4 flex flex-col gap-2">
      <h2>Overview</h2>
      <p>
        This document provides updated usage guidelines for the MzuniPay SDK,
        including how to integrate and customize the payment form in various
        environments.
      </p>
      <hr />
      <h2>Installation</h2>
      <h3>Using NPM</h3>
      <p>Install the SDK into your project using npm:</p>
      <pre className="hljs language-bash">
        <code>npm install mzunipay-sdk{"\n"}</code>
      </pre>
      <h3>Using CDN (Vanilla JS)</h3>
      <p>For vanilla JavaScript integration, include the SDK via a CDN:</p>
      <pre className="hljs language-html">
        <code>
          <span className="hljs-tag">
            &lt;<span className="hljs-name">script</span>{" "}
            <span className="hljs-attr">src</span>=
            <span className="hljs-string">
              &quot;https:{"//"}cdn.jsdelivr.net/npm/mzunipay-sdk/dist/index.umd.js&quot;
            </span>
            &gt;
          </span>
          <span className="hljs-tag">
            &lt;/<span className="hljs-name">script</span>&gt;
          </span>
          {"\n"}
        </code>
      </pre>
      <hr />
      <h2>Quick Start</h2>
      <p>
        Here is a simple example of integrating the MzuniPay SDK with its
        updated API:
      </p>
      <h3>Basic Example</h3>
      <pre className="hljs language-javascript">
        <code>
          <span className="hljs-keyword">import</span>{" "}
          <span className="hljs-title class_">MzuniPay</span>{" "}
          <span className="hljs-keyword">from</span>{" "}
          <span className="hljs-string">&quot;mzunipay-sdk&quot;</span>;{"\n"}
          {"\n"}
          <span className="hljs-keyword">const</span> mzuniPay ={" "}
          <span className="hljs-keyword">new</span>{" "}
          <span className="hljs-title class_">MzuniPay</span>(
          <span className="hljs-string">&quot;your-api-key-here&quot;</span>);{"\n"}
          {"\n"}mzuniPay.
          <span className="hljs-title function_">renderForm</span>({"{"}
          {"\n"}
          {"  "}
          <span className="hljs-attr">containerId</span>:{" "}
          <span className="hljs-string">&quot;payment-form-container&quot;</span>,{" "}
          <span className="hljs-comment">{"//"} ID of the container element</span>
          {"\n"}
          {"  "}
          <span className="hljs-attr">onSuccess</span>:{" "}
          <span className="hljs-function">
            (<span className="hljs-params">response</span>) =&gt;
          </span>{" "}
          {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-variable language_">console</span>.
          <span className="hljs-title function_">log</span>(
          <span className="hljs-string">&quot;Payment Successful!&quot;</span>, response);
          {"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">onError</span>:{" "}
          <span className="hljs-function">
            (<span className="hljs-params">error</span>) =&gt;
          </span>{" "}
          {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-variable language_">console</span>.
          <span className="hljs-title function_">error</span>(
          <span className="hljs-string">&quot;Payment Failed!&quot;</span>, error);{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">styled</span>:{" "}
          <span className="hljs-literal">true</span>,{" "}
          <span className="hljs-comment">
            {"//"} Enable default styling (optional, default is true)
          </span>
          {"\n"}
          {"  "}
          <span className="hljs-attr">buttonText</span>:{" "}
          <span className="hljs-string">&quot;Pay Now&quot;</span>,{" "}
          <span className="hljs-comment">{"//"} Custom button text</span>
          {"\n"}
          {"  "}
          <span className="hljs-attr">defaultValues</span>: {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-attr">amount</span>:{" "}
          <span className="hljs-number">150.0</span>,{" "}
          <span className="hljs-comment">{"//"} Pre-fill the amount field</span>
          {"\n"}
          {"    "}
          <span className="hljs-attr">description</span>:{" "}
          <span className="hljs-string">&quot;Product Purchase&quot;</span>,{" "}
          <span className="hljs-comment">
            {"//"} Pre-fill the description field
          </span>
          {"\n"}
          {"  "}
          {"}"},{"\n"}
          {"}"});{"\n"}
        </code>
      </pre>
      <hr />
      <h2>Customization Options</h2>
      <p>
        You can customize the form layout, styles, and behavior using the
        options provided. Below is a table of the options:
      </p>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>containerId</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>The ID of the HTML element to mount the form into.</td>
            <td>Required</td>
          </tr>
          <tr>
            <td>
              <code>onSuccess</code>
            </td>
            <td>
              <code>(response: any) =&gt; void</code>
            </td>
            <td>Callback function invoked when the payment is successful.</td>
            <td>Required</td>
          </tr>
          <tr>
            <td>
              <code>onError</code>
            </td>
            <td>
              <code>(error: any) =&gt; void</code>
            </td>
            <td>Callback function invoked when the payment fails.</td>
            <td>Required</td>
          </tr>
          <tr>
            <td>
              <code>styled</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>Whether to render the form with default styles.</td>
            <td>
              <code>true</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>buttonText</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>Custom text for the submit button.</td>
            <td>
              <code>&quot;Pay Now&quot;</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>defaultValues</code>
            </td>
            <td>
              <code>
                {"{"} amount?: number; description?: string; {"}"}
              </code>
            </td>
            <td>
              Default values for the <code>amount</code> and{" "}
              <code>description</code> fields.
            </td>
            <td>
              <code>undefined</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>customStyles</code>
            </td>
            <td>
              <code>
                {"{"} form?, input?, button?, status? {"}"}
              </code>
            </td>
            <td>
              Custom styles for the form, input fields, button, and status
              message using CSS properties.
            </td>
            <td>
              <code>undefined</code>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h2>Advanced Customization Example</h2>
      <pre className="hljs language-javascript">
        <code>
          <span className="hljs-keyword">import</span>{" "}
          <span className="hljs-title class_">MzuniPay</span>{" "}
          <span className="hljs-keyword">from</span>{" "}
          <span className="hljs-string">&quot;mzunipay-sdk&quot;</span>;{"\n"}
          {"\n"}
          <span className="hljs-keyword">const</span> mzuniPay ={" "}
          <span className="hljs-keyword">new</span>{" "}
          <span className="hljs-title class_">MzuniPay</span>(
          <span className="hljs-string">&quot;your-api-key-here&quot;</span>);{"\n"}
          {"\n"}mzuniPay.
          <span className="hljs-title function_">renderForm</span>({"{"}
          {"\n"}
          {"  "}
          <span className="hljs-attr">containerId</span>:{" "}
          <span className="hljs-string">&quot;custom-payment-form&quot;</span>,{"\n"}
          {"  "}
          <span className="hljs-attr">onSuccess</span>:{" "}
          <span className="hljs-function">
            (<span className="hljs-params">response</span>) =&gt;
          </span>{" "}
          {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-variable language_">console</span>.
          <span className="hljs-title function_">log</span>(
          <span className="hljs-string">&quot;Payment Successful!&quot;</span>, response);
          {"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">onError</span>:{" "}
          <span className="hljs-function">
            (<span className="hljs-params">error</span>) =&gt;
          </span>{" "}
          {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-variable language_">console</span>.
          <span className="hljs-title function_">error</span>(
          <span className="hljs-string">&quot;Payment Failed!&quot;</span>, error);{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">styled</span>:{" "}
          <span className="hljs-literal">true</span>,{" "}
          <span className="hljs-comment">{"//"} Use styled form</span>
          {"\n"}
          {"  "}
          <span className="hljs-attr">buttonText</span>:{" "}
          <span className="hljs-string">&quot;Submit Payment&quot;</span>,{" "}
          <span className="hljs-comment">{"//"} Custom button text</span>
          {"\n"}
          {"  "}
          <span className="hljs-attr">defaultValues</span>: {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-attr">amount</span>:{" "}
          <span className="hljs-number">200.0</span>,{"\n"}
          {"    "}
          <span className="hljs-attr">description</span>:{" "}
          <span className="hljs-string">&quot;Order #1234&quot;</span>,{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">customStyles</span>: {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-attr">form</span>: {"{"}
          {"\n"}
          {"      "}
          <span className="hljs-attr">backgroundColor</span>:{" "}
          <span className="hljs-string">&quot;#f9f9f9&quot;</span>,{"\n"}
          {"      "}
          <span className="hljs-attr">padding</span>:{" "}
          <span className="hljs-string">&quot;20px&quot;</span>,{"\n"}
          {"      "}
          <span className="hljs-attr">borderRadius</span>:{" "}
          <span className="hljs-string">&quot;8px&quot;</span>,{"\n"}
          {"    "}
          {"}"},{"\n"}
          {"    "}
          <span className="hljs-attr">input</span>: {"{"}
          {"\n"}
          {"      "}
          <span className="hljs-attr">padding</span>:{" "}
          <span className="hljs-string">&quot;10px&quot;</span>,{"\n"}
          {"      "}
          <span className="hljs-attr">border</span>:{" "}
          <span className="hljs-string">&quot;1px solid #ddd&quot;</span>,{"\n"}
          {"    "}
          {"}"},{"\n"}
          {"    "}
          <span className="hljs-attr">button</span>: {"{"}
          {"\n"}
          {"      "}
          <span className="hljs-attr">backgroundColor</span>:{" "}
          <span className="hljs-string">&quot;#007bff&quot;</span>,{"\n"}
          {"      "}
          <span className="hljs-attr">color</span>:{" "}
          <span className="hljs-string">&quot;#fff&quot;</span>,{"\n"}
          {"    "}
          {"}"},{"\n"}
          {"    "}
          <span className="hljs-attr">status</span>: {"{"}
          {"\n"}
          {"      "}
          <span className="hljs-attr">marginTop</span>:{" "}
          <span className="hljs-string">&quot;10px&quot;</span>,{"\n"}
          {"      "}
          <span className="hljs-attr">fontSize</span>:{" "}
          <span className="hljs-string">&quot;14px&quot;</span>,{"\n"}
          {"    "}
          {"}"},{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"}"});{"\n"}
        </code>
      </pre>
      <hr />
      <h2>Input Validation</h2>
      <p>
        The <code>amount</code> field has built-in validation to ensure:
      </p>
      <ol>
        <li>Only numeric characters and one decimal point are allowed.</li>
        <li>Invalid characters are automatically removed.</li>
      </ol>
      <hr />
      <h2>Handling Payments</h2>
      <p>To process payments, the form collects the following fields:</p>
      <ul>
        <li>
          <code>customer_email</code> (required)
        </li>
        <li>
          <code>password</code> (required)
        </li>
        <li>
          <code>amount</code> (required, numeric)
        </li>
        <li>
          <code>description</code> (optional)
        </li>
      </ul>
      <p>
        The SDK interacts with the payment API via the{" "}
        <code>processPayment</code> method, sending the collected data to your
        backend.
      </p>
      <hr />
      <h2>Using with CDN</h2>
      <p>
        For developers who prefer vanilla JavaScript or CDN-based integration:
      </p>
      <pre className="hljs language-html">
        <code>
          <span className="hljs-tag">
            &lt;<span className="hljs-name">head</span>&gt;
          </span>
          {"\n"}
          {"  "}
          <span className="hljs-tag">
            &lt;<span className="hljs-name">script</span>{" "}
            <span className="hljs-attr">src</span>=
            <span className="hljs-string">
            &quot;https:{"//"}cdn.jsdelivr.net/npm/mzunipay-sdk/dist/index.umd.js&quot;
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
            &lt;<span className="hljs-name">div</span>{" "}
            <span className="hljs-attr">id</span>=
            <span className="hljs-string">&quot;payment-form-container&quot;</span>&gt;
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
            <span className="hljs-keyword">const</span> mzuniPay ={" "}
            <span className="hljs-keyword">new</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>(
            <span className="hljs-string">&quot;your-api-key-here&quot;</span>);{"\n"}
            {"    "}mzuniPay.
            <span className="hljs-title function_">renderForm</span>({"{"}
            {"\n"}
            {"      "}
            <span className="hljs-attr">containerId</span>:{" "}
            <span className="hljs-string">&quot;payment-form-container&quot;</span>,{"\n"}
            {"      "}
            <span className="hljs-attr">onSuccess</span>:{" "}
            <span className="hljs-function">
              (<span className="hljs-params">response</span>) =&gt;
            </span>{" "}
            <span className="hljs-variable language_">console</span>.
            <span className="hljs-title function_">log</span>(
            <span className="hljs-string">&quot;Success:&quot;</span>, response),{"\n"}
            {"      "}
            <span className="hljs-attr">onError</span>:{" "}
            <span className="hljs-function">
              (<span className="hljs-params">error</span>) =&gt;
            </span>{" "}
            <span className="hljs-variable language_">console</span>.
            <span className="hljs-title function_">error</span>(
            <span className="hljs-string">&quot;Error:&quot;</span>, error),{"\n"}
            {"      "}
            <span className="hljs-attr">styled</span>:{" "}
            <span className="hljs-literal">true</span>,{"\n"}
            {"      "}
            <span className="hljs-attr">buttonText</span>:{" "}
            <span className="hljs-string">&quot;Submit&quot;</span>,{"\n"}
            {"      "}
            <span className="hljs-attr">defaultValues</span>: {"{"}
            {"\n"}
            {"        "}
            <span className="hljs-attr">amount</span>:{" "}
            <span className="hljs-number">100.0</span>,{"\n"}
            {"        "}
            <span className="hljs-attr">description</span>:{" "}
            <span className="hljs-string">&quot;Purchase Item A&quot;</span>,{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}
            <span className="hljs-attr">customStyles</span>: {"{"}
            {"\n"}
            {"        "}
            <span className="hljs-attr">button</span>: {"{"}{" "}
            <span className="hljs-attr">backgroundColor</span>:{" "}
            <span className="hljs-string">&quot;blue&quot;</span>,{" "}
            <span className="hljs-attr">color</span>:{" "}
            <span className="hljs-string">&quot;white&quot;</span> {"}"},{"\n"}
            {"      "}
            {"}"},{"\n"}
            {"    "}
            {"}"});{"\n"}
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
        </code>
      </pre>
      <hr />
      <h2>Notes</h2>
      <ol>
        <li>
          Replace <code>&quot;your-api-key-here&quot;</code> with your actual API key.
        </li>
        <li>
          Ensure the container ID (e.g., <code>payment-form-container</code>)
          exists in the DOM.
        </li>
        <li>
          Use the <code>onSuccess</code> and <code>onError</code> callbacks to
          handle the results of the payment process.
        </li>
        <li>
          Test your integration in a staging environment before going live.
        </li>
      </ol>
      <p>
        For further assistance, contact{" "}
        <a href="mailto:support@mzunipay.com">support@mzunipay.com</a>.
      </p>
      Fork me on GitHub
    </div>
  );
}

export default Dev;
