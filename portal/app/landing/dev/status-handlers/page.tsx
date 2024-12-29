import React from "react";

function StatusHandlers() {
  return (
    <div className="result-html mb-8 pb-4 flex flex-col gap-2">
      <h1>Handling onSuccess and onError Callbacks with MzuniPay SDK</h1>
      <h2>Overview</h2>
      <p>
        The <code>onSuccess</code> and <code>onError</code> callbacks in the
        MzuniPay SDK are designed to provide real-time feedback for payment
        processing. This document provides real-world examples of how to
        implement these callbacks effectively to handle both successful
        transactions and errors.
      </p>
      <hr />
      <h2>Example 1: Storing Payment Records in a Database</h2>
      <p>
        When a payment is successful, you may want to save the transaction
        details in your database.
      </p>
      <h3>Implementation</h3>
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
          <span className="hljs-string">&quot;your-api-key-here&quot;</span>);
          {"\n"}
          {"\n"}mzuniPay.
          <span className="hljs-title function_">renderForm</span>({"{"}
          {"\n"}
          {"  "}
          <span className="hljs-attr">containerId</span>:{" "}
          <span className="hljs-string">
            &quot;payment-form-container&quot;
          </span>
          ,{"\n"}
          {"  "}
          <span className="hljs-attr">onSuccess</span>:{" "}
          <span className="hljs-keyword">async</span> (response) =&gt; {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-variable language_">console</span>.
          <span className="hljs-title function_">log</span>(
          <span className="hljs-string">&quot;Payment Successful!&quot;</span>,
          response);
          {"\n"}
          {"\n"}
          {"    "}
          <span className="hljs-keyword">try</span> {"{"}
          {"\n"}
          {"      "}
          <span className="hljs-comment">
            {"//"} Save transaction to the database
          </span>
          {"\n"}
          {"      "}
          <span className="hljs-keyword">const</span> res ={" "}
          <span className="hljs-keyword">await</span>{" "}
          <span className="hljs-title function_">fetch</span>(
          <span className="hljs-string">&quot;/api/save-transaction&quot;</span>
          , {"{"}
          {"\n"}
          {"        "}
          <span className="hljs-attr">method</span>:{" "}
          <span className="hljs-string">&quot;POST&quot;</span>,{"\n"}
          {"        "}
          <span className="hljs-attr">headers</span>: {"{"}
          {"\n"}
          {"          "}
          <span className="hljs-string">&quot;Content-Type&quot;</span>:{" "}
          <span className="hljs-string">&quot;application/json&quot;</span>,
          {"\n"}
          {"        "}
          {"}"},{"\n"}
          {"        "}
          <span className="hljs-attr">body</span>:{" "}
          <span className="hljs-title class_">JSON</span>.
          <span className="hljs-title function_">stringify</span>({"{"}
          {"\n"}
          {"          "}
          <span className="hljs-attr">transactionId</span>: response.
          <span className="hljs-property">transactionId</span>,{"\n"}
          {"          "}
          <span className="hljs-attr">amount</span>: response.
          <span className="hljs-property">amount</span>,{"\n"}
          {"          "}
          <span className="hljs-attr">customerEmail</span>: response.
          <span className="hljs-property">customer_email</span>,{"\n"}
          {"          "}
          <span className="hljs-attr">status</span>: response.
          <span className="hljs-property">status</span>,{"\n"}
          {"        "}
          {"}"}),{"\n"}
          {"      "}
          {"}"});{"\n"}
          {"\n"}
          {"      "}
          <span className="hljs-keyword">if</span> (!res.
          <span className="hljs-property">ok</span>) {"{"}
          {"\n"}
          {"        "}
          <span className="hljs-keyword">throw</span>{" "}
          <span className="hljs-keyword">new</span>{" "}
          <span className="hljs-title class_">Error</span>(
          <span className="hljs-string">
            &quot;Failed to save transaction&quot;
          </span>
          );
          {"\n"}
          {"      "}
          {"}"}
          {"\n"}
          {"\n"}
          {"      "}
          <span className="hljs-variable language_">console</span>.
          <span className="hljs-title function_">log</span>(
          <span className="hljs-string">
            &quot;Transaction saved successfully!&quot;
          </span>
          );
          {"\n"}
          {"    "}
          {"}"} <span className="hljs-keyword">catch</span> (error) {"{"}
          {"\n"}
          {"      "}
          <span className="hljs-variable language_">console</span>.
          <span className="hljs-title function_">error</span>(
          <span className="hljs-string">
            &quot;Error saving transaction:&quot;
          </span>
          , error);
          {"\n"}
          {"    "}
          {"}"}
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
          <span className="hljs-string">&quot;Payment Failed!&quot;</span>,
          error);{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">styled</span>:{" "}
          <span className="hljs-literal">true</span>,{"\n"}
          {"  "}
          <span className="hljs-attr">buttonText</span>:{" "}
          <span className="hljs-string">&quot;Pay Now&quot;</span>,{"\n"}
          {"  "}
          <span className="hljs-attr">defaultValues</span>: {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-attr">amount</span>:{" "}
          <span className="hljs-number">150.0</span>,{"\n"}
          {"    "}
          <span className="hljs-attr">description</span>:{" "}
          <span className="hljs-string">&quot;Order #1234&quot;</span>,{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"}"});{"\n"}
        </code>
      </pre>
      <hr />
      <h2>Example 2: Showing User-Friendly Feedback to Customers</h2>
      <p>
        In a production environment, providing feedback to customers is crucial
        for good UX. Use the callbacks to display status messages dynamically.
      </p>
      <h3>Implementation</h3>
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
          <span className="hljs-string">&quot;your-api-key-here&quot;</span>);
          {"\n"}
          {"\n"}mzuniPay.
          <span className="hljs-title function_">renderForm</span>({"{"}
          {"\n"}
          {"  "}
          <span className="hljs-attr">containerId</span>:{" "}
          <span className="hljs-string">
            &quot;payment-form-container&quot;
          </span>
          ,{"\n"}
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
          <span className="hljs-string">&quot;Payment Successful!&quot;</span>,
          response);
          {"\n"}
          {"\n"}
          {"    "}
          <span className="hljs-comment">
            {"//"} Display a success message to the customer
          </span>
          {"\n"}
          {"    "}
          <span className="hljs-keyword">const</span> statusDiv ={" "}
          <span className="hljs-variable language_">document</span>.
          <span className="hljs-title function_">getElementById</span>(
          <span className="hljs-string">&quot;payment-status&quot;</span>);
          {"\n"}
          {"    "}statusDiv.<span className="hljs-property">innerHTML</span> ={" "}
          <span className="hljs-string">
            &apos;&lt;p style=&quot;color: green; font-weight: bold;&quot;&gt;Payment
            successful! Thank you for your purchase.&lt;/p&gt;&apos;
          </span>
          ;{"\n"}
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
          <span className="hljs-string">&quot;Payment Failed!&quot;</span>,
          error);{"\n"}
          {"\n"}
          {"    "}
          <span className="hljs-comment">
            {"//"} Display an error message to the customer
          </span>
          {"\n"}
          {"    "}
          <span className="hljs-keyword">const</span> statusDiv ={" "}
          <span className="hljs-variable language_">document</span>.
          <span className="hljs-title function_">getElementById</span>(
          <span className="hljs-string">&quot;payment-status&quot;</span>);
          {"\n"}
          {"    "}statusDiv.<span className="hljs-property">innerHTML</span> ={" "}
          <span className="hljs-string">
            `&lt;p style=&quot;color: red; font-weight: bold;&quot;&gt;Payment failed.
            Please try again or contact support.&lt;/p&gt;`
          </span>
          ;{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">styled</span>:{" "}
          <span className="hljs-literal">true</span>,{"\n"}
          {"  "}
          <span className="hljs-attr">buttonText</span>:{" "}
          <span className="hljs-string">&quot;Submit Payment&quot;</span>,{"\n"}
          {"  "}
          <span className="hljs-attr">defaultValues</span>: {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-attr">amount</span>:{" "}
          <span className="hljs-number">200.0</span>,{"\n"}
          {"    "}
          <span className="hljs-attr">description</span>:{" "}
          <span className="hljs-string">&quot;Subscription Payment&quot;</span>,
          {"\n"}
          {"  "}
          {"}"},{"\n"}
          {"}"});{"\n"}
        </code>
      </pre>
      <h3>HTML Structure</h3>
      <pre className="hljs language-html">
        <code>
          <span className="hljs-tag">
            &lt;<span className="hljs-name">div</span>{" "}
            <span className="hljs-attr">id</span>=
            <span className="hljs-string">
              &quot;payment-form-container&quot;
            </span>
            &gt;
          </span>
          <span className="hljs-tag">
            &lt;/<span className="hljs-name">div</span>&gt;
          </span>
          {"\n"}
          <span className="hljs-tag">
            &lt;<span className="hljs-name">div</span>{" "}
            <span className="hljs-attr">id</span>=
            <span className="hljs-string">&quot;payment-status&quot;</span>&gt;
          </span>
          <span className="hljs-tag">
            &lt;/<span className="hljs-name">div</span>&gt;
          </span>
          {"\n"}
        </code>
      </pre>
      <hr />
      <h2>Example 3: Logging Transactions for Analytics</h2>
      <p>
        You can log all transactions to a third-party analytics service for
        better insights.
      </p>
      <h3>Implementation</h3>
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
          <span className="hljs-string">&quot;your-api-key-here&quot;</span>);
          {"\n"}
          {"\n"}mzuniPay.
          <span className="hljs-title function_">renderForm</span>({"{"}
          {"\n"}
          {"  "}
          <span className="hljs-attr">containerId</span>:{" "}
          <span className="hljs-string">
            &quot;payment-form-container&quot;
          </span>
          ,{"\n"}
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
          <span className="hljs-string">&quot;Payment Successful!&quot;</span>,
          response);
          {"\n"}
          {"\n"}
          {"    "}
          <span className="hljs-comment">
            {"//"} Send transaction data to an analytics service
          </span>
          {"\n"}
          {"    "}
          <span className="hljs-title function_">fetch</span>(
          <span className="hljs-string">
          &quot;https:{"//"}analytics.example.com/log&quot;
          </span>
          , {"{"}
          {"\n"}
          {"      "}
          <span className="hljs-attr">method</span>:{" "}
          <span className="hljs-string">&quot;POST&quot;</span>,{"\n"}
          {"      "}
          <span className="hljs-attr">headers</span>: {"{"}
          {"\n"}
          {"        "}
          <span className="hljs-string">&quot;Content-Type&quot;</span>:{" "}
          <span className="hljs-string">&quot;application/json&quot;</span>,
          {"\n"}
          {"      "}
          {"}"},{"\n"}
          {"      "}
          <span className="hljs-attr">body</span>:{" "}
          <span className="hljs-title class_">JSON</span>.
          <span className="hljs-title function_">stringify</span>({"{"}
          {"\n"}
          {"        "}
          <span className="hljs-attr">event</span>:{" "}
          <span className="hljs-string">&quot;payment_success&quot;</span>,
          {"\n"}
          {"        "}
          <span className="hljs-attr">transactionId</span>: response.
          <span className="hljs-property">transactionId</span>,{"\n"}
          {"        "}
          <span className="hljs-attr">amount</span>: response.
          <span className="hljs-property">amount</span>,{"\n"}
          {"        "}
          <span className="hljs-attr">customerEmail</span>: response.
          <span className="hljs-property">customer_email</span>,{"\n"}
          {"      "}
          {"}"}),{"\n"}
          {"    "}
          {"}"});{"\n"}
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
          <span className="hljs-string">&quot;Payment Failed!&quot;</span>,
          error);{"\n"}
          {"\n"}
          {"    "}
          <span className="hljs-comment">
            {"//"} Log errors to an error-tracking service
          </span>
          {"\n"}
          {"    "}
          <span className="hljs-title function_">fetch</span>(
          <span className="hljs-string">
          &quot;https:{"//"}analytics.example.com/log&quot;
          </span>
          , {"{"}
          {"\n"}
          {"      "}
          <span className="hljs-attr">method</span>:{" "}
          <span className="hljs-string">&quot;POST&quot;</span>,{"\n"}
          {"      "}
          <span className="hljs-attr">headers</span>: {"{"}
          {"\n"}
          {"        "}
          <span className="hljs-string">&quot;Content-Type&quot;</span>:{" "}
          <span className="hljs-string">&quot;application/json&quot;</span>,
          {"\n"}
          {"      "}
          {"}"},{"\n"}
          {"      "}
          <span className="hljs-attr">body</span>:{" "}
          <span className="hljs-title class_">JSON</span>.
          <span className="hljs-title function_">stringify</span>({"{"}
          {"\n"}
          {"        "}
          <span className="hljs-attr">event</span>:{" "}
          <span className="hljs-string">&quot;payment_error&quot;</span>,{"\n"}
          {"        "}
          <span className="hljs-attr">error</span>: error.
          <span className="hljs-property">message</span>,{"\n"}
          {"      "}
          {"}"}),{"\n"}
          {"    "}
          {"}"});{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">styled</span>:{" "}
          <span className="hljs-literal">true</span>,{"\n"}
          {"  "}
          <span className="hljs-attr">buttonText</span>:{" "}
          <span className="hljs-string">&quot;Pay Now&quot;</span>,{"\n"}
          {"  "}
          <span className="hljs-attr">defaultValues</span>: {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-attr">amount</span>:{" "}
          <span className="hljs-number">100.0</span>,{"\n"}
          {"    "}
          <span className="hljs-attr">description</span>:{" "}
          <span className="hljs-string">&quot;Service Fee&quot;</span>,{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"}"});{"\n"}
        </code>
      </pre>
      <hr />
      <h2>Example 4: Redirecting Users After Payment</h2>
      <p>
        Sometimes you may want to redirect users to a specific page after a
        successful or failed transaction.
      </p>
      <h3>Implementation</h3>
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
          <span className="hljs-string">&quot;your-api-key-here&quot;</span>);
          {"\n"}
          {"\n"}mzuniPay.
          <span className="hljs-title function_">renderForm</span>({"{"}
          {"\n"}
          {"  "}
          <span className="hljs-attr">containerId</span>:{" "}
          <span className="hljs-string">
            &quot;payment-form-container&quot;
          </span>
          ,{"\n"}
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
          <span className="hljs-string">&quot;Payment Successful!&quot;</span>,
          response);
          {"\n"}
          {"\n"}
          {"    "}
          <span className="hljs-comment">
            {"//"} Redirect to a thank-you page
          </span>
          {"\n"}
          {"    "}
          <span className="hljs-variable language_">window</span>.
          <span className="hljs-property">location</span>.
          <span className="hljs-property">href</span> ={" "}
          <span className="hljs-string">
            `/thank-you?transactionId=
            <span className="hljs-subst">
              ${"{"}response.transactionId{"}"}
            </span>
            `
          </span>
          ;{"\n"}
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
          <span className="hljs-string">&quot;Payment Failed!&quot;</span>,
          error);{"\n"}
          {"\n"}
          {"    "}
          <span className="hljs-comment">{"//"} Redirect to an error page</span>
          {"\n"}
          {"    "}
          <span className="hljs-variable language_">window</span>.
          <span className="hljs-property">location</span>.
          <span className="hljs-property">href</span> ={" "}
          <span className="hljs-string">
            `/error?message=
            <span className="hljs-subst">
              ${"{"}
              <span className="hljs-built_in">encodeURIComponent</span>
              (error.message){"}"}
            </span>
            `
          </span>
          ;{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"  "}
          <span className="hljs-attr">styled</span>:{" "}
          <span className="hljs-literal">true</span>,{"\n"}
          {"  "}
          <span className="hljs-attr">buttonText</span>:{" "}
          <span className="hljs-string">&quot;Complete Payment&quot;</span>,
          {"\n"}
          {"  "}
          <span className="hljs-attr">defaultValues</span>: {"{"}
          {"\n"}
          {"    "}
          <span className="hljs-attr">amount</span>:{" "}
          <span className="hljs-number">250.0</span>,{"\n"}
          {"    "}
          <span className="hljs-attr">description</span>:{" "}
          <span className="hljs-string">&quot;Event Ticket Purchase&quot;</span>
          ,{"\n"}
          {"  "}
          {"}"},{"\n"}
          {"}"});{"\n"}
        </code>
      </pre>
      <hr />
      <h2>Notes</h2>
      <ol>
        <li>
          Always validate responses on your server before performing sensitive
          operations like saving records or redirecting users.
        </li>
        <li>
          Test the behavior of both <code>onSuccess</code> and{" "}
          <code>onError</code> callbacks under different scenarios.
        </li>
        <li>
          Customize the error messages and feedback to align with your
          application’s tone and branding.
        </li>
      </ol>
      
    </div>
  );
}

export default StatusHandlers;
