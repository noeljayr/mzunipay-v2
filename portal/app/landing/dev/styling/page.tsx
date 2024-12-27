import React from "react";

function page() {
  return (
    <div className="result-html mb-8 pb-4 flex flex-col gap-2">
      <>
        <h1>CSS Styling Options</h1>
        <table>
          <thead>
            <tr>
              <th>
                <strong>CSS Option</strong>
              </th>
              <th>
                <strong>Type</strong>
              </th>
              <th>
                <strong>Target Element</strong>
              </th>
              <th>
                <strong>Description</strong>
              </th>
              <th>
                <strong>Default Value</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>styles.form</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>Entire form container</td>
              <td>CSS styles for the overall layout of the form.</td>
              <td>
                <code>
                  {"{"} display: "flex", flexDirection: "column", gap: "0.5rem"{" "}
                  {"}"}
                </code>
              </td>
            </tr>
            <tr>
              <td>
                <code>styles.input</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                Input fields (<code>&lt;input&gt;</code>)
              </td>
              <td>
                CSS styles for input fields like email, password, and amount.
              </td>
              <td>
                <code>
                  {"{"} padding: "0.35rem", fontSize: "0.8rem", borderRadius:
                  "4px", border: "1px solid #ccc" {"}"}
                </code>
              </td>
            </tr>
            <tr>
              <td>
                <code>styles.textarea</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>Description field</td>
              <td>CSS styles for the optional description text area.</td>
              <td>
                <code>
                  {"{"} padding: "0.35rem", fontSize: "0.8rem", borderRadius:
                  "4px", border: "1px solid #ccc" {"}"}
                </code>
              </td>
            </tr>
            <tr>
              <td>
                <code>styles.button</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>Submit button</td>
              <td>CSS styles for the submit button.</td>
              <td>
                <code>
                  {"{"} padding: "0.5rem 0.5rem", fontSize: "0.8rem", color:
                  "#fff", backgroundColor: "#129549", ... {"}"}
                </code>
              </td>
            </tr>
            <tr>
              <td>
                <code>styles.status</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>Status message container</td>
              <td>
                CSS styles for the payment status message shown after form
                submission.
              </td>
              <td>
                <code>
                  {"{"} marginTop: "0.5rem", fontSize: "0.5rem" {"}"}
                </code>
              </td>
            </tr>
            <tr>
              <td>
                <code>styles.container</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>Form parent container</td>
              <td>
                CSS styles for the HTML container element where the form is
                mounted.
              </td>
              <td>
                <code>
                  {"{"}
                  {"}"}
                </code>{" "}
                (No default styles applied)
              </td>
            </tr>
            <tr>
              <td>
                <code>styles.label</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>Labels (if added)</td>
              <td>
                CSS styles for labels used for input fields (if labels are added
                by the user).
              </td>
              <td>
                <code>
                  {"{"}
                  {"}"}
                </code>{" "}
                (No default labels are rendered)
              </td>
            </tr>
            <tr>
              <td>
                <code>styles.errorMessage</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>Error messages (if added)</td>
              <td>
                CSS styles for error messages displayed for invalid inputs or
                failed payments.
              </td>
              <td>
                <code>
                  {"{"} color: "red", fontSize: "0.8rem" {"}"}
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </div>
  );
}

export default page;
