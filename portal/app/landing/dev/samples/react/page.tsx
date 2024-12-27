import React from "react";

function ReactSample() {
  return (
    <div className="result-html mb-8 pb-4 flex flex-col gap-2">
      <>
        <h1>MzuniPay SDK Examples with React</h1>
        <h2>Overview</h2>
        <p>
          This guide provides examples of how to integrate the MzuniPay SDK into
          a React application. The examples demonstrate rendering a payment
          form, handling success and error callbacks, and customizing the form.
        </p>
        <hr />
        <h2>Installation</h2>
        <p>First, install the MzuniPay SDK in your React project:</p>
        <pre className="hljs language-bash">
          <code>npm install mzunipay{"\n"}</code>
        </pre>
        <hr />
        <h2>Example Code</h2>
        <h3>Basic Integration</h3>
        <p>
          Below is an example of integrating the payment form into a React
          component:
        </p>
        <pre className="hljs language-javascript">
          <code>
            <span className="hljs-keyword">import</span>{" "}
            <span className="hljs-title class_">React</span>, {"{"} useEffect{" "}
            {"}"} <span className="hljs-keyword">from</span>{" "}
            <span className="hljs-string">'react'</span>;{"\n"}
            <span className="hljs-keyword">import</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>{" "}
            <span className="hljs-keyword">from</span>{" "}
            <span className="hljs-string">'mzunipay'</span>;{"\n"}
            {"\n"}
            <span className="hljs-keyword">const</span>{" "}
            <span className="hljs-title function_">PaymentForm</span> = (
            <span className="hljs-params" />) =&gt; {"{"}
            {"\n"}
            {"  "}
            <span className="hljs-title function_">useEffect</span>(
            <span className="hljs-function">() =&gt;</span> {"{"}
            {"\n"}
            {"    "}
            <span className="hljs-keyword">const</span> mzuniPay ={" "}
            <span className="hljs-keyword">new</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>(
            <span className="hljs-string">"your-api-key-here"</span>);{"\n"}
            {"\n"}
            {"    "}mzuniPay.
            <span className="hljs-title function_">renderForm</span>({"\n"}
            {"      "}
            <span className="hljs-string">"payment-form-container"</span>,{" "}
            <span className="hljs-comment">// ID of the container element</span>
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
            <span className="hljs-number">150.0</span>,{" "}
            <span className="hljs-comment">// Pre-fill the amount field</span>
            {"\n"}
            {"        "}
            <span className="hljs-attr">description</span>:{" "}
            <span className="hljs-string">"Payment for goods"</span>,{" "}
            <span className="hljs-comment">
              // Pre-fill the description field
            </span>
            {"\n"}
            {"      "}
            {"}"}
            {"\n"}
            {"    "});{"\n"}
            {"  "}
            {"}"}, []);{"\n"}
            {"\n"}
            {"  "}
            <span className="hljs-keyword">return</span>{" "}
            <span className="language-xml">
              <span className="hljs-tag">
                &lt;<span className="hljs-name">div</span>{" "}
                <span className="hljs-attr">id</span>=
                <span className="hljs-string">"payment-form-container"</span>
                &gt;
              </span>
              <span className="hljs-tag">
                &lt;/<span className="hljs-name">div</span>&gt;
              </span>
            </span>
            ;{"\n"}
            {"}"};{"\n"}
            {"\n"}
            <span className="hljs-keyword">export</span>{" "}
            <span className="hljs-keyword">default</span>{" "}
            <span className="hljs-title class_">PaymentForm</span>;{"\n"}
          </code>
        </pre>
        <hr />
        <h3>Advanced Example with Custom Styles</h3>
        <p>
          You can customize the form by passing additional style options to the{" "}
          <code>renderForm</code> method. Here’s an example:
        </p>
        <pre className="hljs language-javascript">
          <code>
            <span className="hljs-keyword">import</span>{" "}
            <span className="hljs-title class_">React</span>, {"{"} useEffect{" "}
            {"}"} <span className="hljs-keyword">from</span>{" "}
            <span className="hljs-string">'react'</span>;{"\n"}
            <span className="hljs-keyword">import</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>{" "}
            <span className="hljs-keyword">from</span>{" "}
            <span className="hljs-string">'mzunipay'</span>;{"\n"}
            {"\n"}
            <span className="hljs-keyword">const</span>{" "}
            <span className="hljs-title function_">CustomizedPaymentForm</span>{" "}
            = (
            <span className="hljs-params" />) =&gt; {"{"}
            {"\n"}
            {"  "}
            <span className="hljs-title function_">useEffect</span>(
            <span className="hljs-function">() =&gt;</span> {"{"}
            {"\n"}
            {"    "}
            <span className="hljs-keyword">const</span> mzuniPay ={" "}
            <span className="hljs-keyword">new</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>(
            <span className="hljs-string">"your-api-key-here"</span>);{"\n"}
            {"\n"}
            {"    "}mzuniPay.
            <span className="hljs-title function_">renderForm</span>({"\n"}
            {"      "}
            <span className="hljs-string">"payment-form-container"</span>,{" "}
            <span className="hljs-comment">// ID of the container element</span>
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
            <span className="hljs-string">"Submit Payment"</span>,{" "}
            <span className="hljs-comment">// Custom button text</span>
            {"\n"}
            {"      "}
            {"{"}
            {"\n"}
            {"        "}
            <span className="hljs-attr">amount</span>:{" "}
            <span className="hljs-number">200.0</span>,{" "}
            <span className="hljs-comment">// Pre-fill the amount field</span>
            {"\n"}
            {"        "}
            <span className="hljs-attr">description</span>:{" "}
            <span className="hljs-string">"Order #1234"</span>,{" "}
            <span className="hljs-comment">
              // Pre-fill the description field
            </span>
            {"\n"}
            {"        "}
            <span className="hljs-attr">styles</span>: {"{"}
            {"\n"}
            {"          "}
            <span className="hljs-attr">form</span>: {"{"}{" "}
            <span className="hljs-attr">backgroundColor</span>:{" "}
            <span className="hljs-string">"#f9f9f9"</span>,{" "}
            <span className="hljs-attr">padding</span>:{" "}
            <span className="hljs-string">"20px"</span>,{" "}
            <span className="hljs-attr">borderRadius</span>:{" "}
            <span className="hljs-string">"8px"</span> {"}"},{"\n"}
            {"          "}
            <span className="hljs-attr">input</span>: {"{"}{" "}
            <span className="hljs-attr">padding</span>:{" "}
            <span className="hljs-string">"10px"</span>,{" "}
            <span className="hljs-attr">border</span>:{" "}
            <span className="hljs-string">"1px solid #ddd"</span> {"}"},{"\n"}
            {"          "}
            <span className="hljs-attr">button</span>: {"{"}{" "}
            <span className="hljs-attr">backgroundColor</span>:{" "}
            <span className="hljs-string">"#007bff"</span>,{" "}
            <span className="hljs-attr">color</span>:{" "}
            <span className="hljs-string">"#fff"</span>,{" "}
            <span className="hljs-attr">padding</span>:{" "}
            <span className="hljs-string">"10px 20px"</span> {"}"},{"\n"}
            {"        "}
            {"}"},{"\n"}
            {"      "}
            {"}"}
            {"\n"}
            {"    "});{"\n"}
            {"  "}
            {"}"}, []);{"\n"}
            {"\n"}
            {"  "}
            <span className="hljs-keyword">return</span>{" "}
            <span className="language-xml">
              <span className="hljs-tag">
                &lt;<span className="hljs-name">div</span>{" "}
                <span className="hljs-attr">id</span>=
                <span className="hljs-string">"payment-form-container"</span>
                &gt;
              </span>
              <span className="hljs-tag">
                &lt;/<span className="hljs-name">div</span>&gt;
              </span>
            </span>
            ;{"\n"}
            {"}"};{"\n"}
            {"\n"}
            <span className="hljs-keyword">export</span>{" "}
            <span className="hljs-keyword">default</span>{" "}
            <span className="hljs-title class_">CustomizedPaymentForm</span>;
            {"\n"}
          </code>
        </pre>
        <hr />
        <h3>Rendering Multiple Forms</h3>
        <p>
          You can render multiple payment forms in different parts of your
          application by using unique container IDs for each form. Here’s an
          example:
        </p>
        <pre className="hljs language-javascript">
          <code>
            <span className="hljs-keyword">import</span>{" "}
            <span className="hljs-title class_">React</span>, {"{"} useEffect{" "}
            {"}"} <span className="hljs-keyword">from</span>{" "}
            <span className="hljs-string">'react'</span>;{"\n"}
            <span className="hljs-keyword">import</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>{" "}
            <span className="hljs-keyword">from</span>{" "}
            <span className="hljs-string">'mzunipay'</span>;{"\n"}
            {"\n"}
            <span className="hljs-keyword">const</span>{" "}
            <span className="hljs-title function_">MultiFormPage</span> = (
            <span className="hljs-params" />) =&gt; {"{"}
            {"\n"}
            {"  "}
            <span className="hljs-title function_">useEffect</span>(
            <span className="hljs-function">() =&gt;</span> {"{"}
            {"\n"}
            {"    "}
            <span className="hljs-keyword">const</span> mzuniPay ={" "}
            <span className="hljs-keyword">new</span>{" "}
            <span className="hljs-title class_">MzuniPay</span>(
            <span className="hljs-string">"your-api-key-here"</span>);{"\n"}
            {"\n"}
            {"    "}mzuniPay.
            <span className="hljs-title function_">renderForm</span>({"\n"}
            {"      "}
            <span className="hljs-string">"form1-container"</span>,{"\n"}
            {"      "}
            <span className="hljs-function">
              (<span className="hljs-params">response</span>) =&gt;
            </span>{" "}
            {"{"}
            {"\n"}
            {"        "}
            <span className="hljs-variable language_">console</span>.
            <span className="hljs-title function_">log</span>(
            <span className="hljs-string">"Form 1 Payment Successful!"</span>,
            response);{"\n"}
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
            <span className="hljs-string">"Form 1 Payment Failed!"</span>,
            error);
            {"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}
            <span className="hljs-literal">true</span>,{"\n"}
            {"      "}
            <span className="hljs-string">"Pay for Product A"</span>,{"\n"}
            {"      "}
            {"{"} <span className="hljs-attr">amount</span>:{" "}
            <span className="hljs-number">100.0</span>,{" "}
            <span className="hljs-attr">description</span>:{" "}
            <span className="hljs-string">"Product A"</span> {"}"}
            {"\n"}
            {"    "});{"\n"}
            {"\n"}
            {"    "}mzuniPay.
            <span className="hljs-title function_">renderForm</span>({"\n"}
            {"      "}
            <span className="hljs-string">"form2-container"</span>,{"\n"}
            {"      "}
            <span className="hljs-function">
              (<span className="hljs-params">response</span>) =&gt;
            </span>{" "}
            {"{"}
            {"\n"}
            {"        "}
            <span className="hljs-variable language_">console</span>.
            <span className="hljs-title function_">log</span>(
            <span className="hljs-string">"Form 2 Payment Successful!"</span>,
            response);{"\n"}
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
            <span className="hljs-string">"Form 2 Payment Failed!"</span>,
            error);
            {"\n"}
            {"      "}
            {"}"},{"\n"}
            {"      "}
            <span className="hljs-literal">true</span>,{"\n"}
            {"      "}
            <span className="hljs-string">"Pay for Product B"</span>,{"\n"}
            {"      "}
            {"{"} <span className="hljs-attr">amount</span>:{" "}
            <span className="hljs-number">200.0</span>,{" "}
            <span className="hljs-attr">description</span>:{" "}
            <span className="hljs-string">"Product B"</span> {"}"}
            {"\n"}
            {"    "});{"\n"}
            {"  "}
            {"}"}, []);{"\n"}
            {"\n"}
            {"  "}
            <span className="hljs-keyword">return</span> ({"\n"}
            {"    "}
            <span className="language-xml">
              <span className="hljs-tag">
                &lt;<span className="hljs-name">div</span>&gt;
              </span>
              {"\n"}
              {"      "}
              <span className="hljs-tag">
                &lt;<span className="hljs-name">h1</span>&gt;
              </span>
              Product A
              <span className="hljs-tag">
                &lt;/<span className="hljs-name">h1</span>&gt;
              </span>
              {"\n"}
              {"      "}
              <span className="hljs-tag">
                &lt;<span className="hljs-name">div</span>{" "}
                <span className="hljs-attr">id</span>=
                <span className="hljs-string">"form1-container"</span>&gt;
              </span>
              <span className="hljs-tag">
                &lt;/<span className="hljs-name">div</span>&gt;
              </span>
              {"\n"}
              {"\n"}
              {"      "}
              <span className="hljs-tag">
                &lt;<span className="hljs-name">h1</span>&gt;
              </span>
              Product B
              <span className="hljs-tag">
                &lt;/<span className="hljs-name">h1</span>&gt;
              </span>
              {"\n"}
              {"      "}
              <span className="hljs-tag">
                &lt;<span className="hljs-name">div</span>{" "}
                <span className="hljs-attr">id</span>=
                <span className="hljs-string">"form2-container"</span>&gt;
              </span>
              <span className="hljs-tag">
                &lt;/<span className="hljs-name">div</span>&gt;
              </span>
              {"\n"}
              {"    "}
              <span className="hljs-tag">
                &lt;/<span className="hljs-name">div</span>&gt;
              </span>
            </span>
            {"\n"}
            {"  "});{"\n"}
            {"}"};{"\n"}
            {"\n"}
            <span className="hljs-keyword">export</span>{" "}
            <span className="hljs-keyword">default</span>{" "}
            <span className="hljs-title class_">MultiFormPage</span>;{"\n"}
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
          <li>
            Avoid re-rendering the form unnecessarily within React’s lifecycle
            to prevent duplicate elements or errors.
          </li>
        </ol>
        <hr />
      </>
    </div>
  );
}

export default ReactSample;
