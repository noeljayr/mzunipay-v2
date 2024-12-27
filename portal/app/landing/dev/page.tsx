import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const table = `

| **Feature**                      | **Description**                                                                                  |  
|-----------------------------------|--------------------------------------------------------------------------------------------------|  
| **Peer-to-Peer Transfers**        | Easily transfer funds between students, enabling fast and secure payments within the university. |  
| **Online Payment for E-Commerce**| Seamlessly integrate online payment capabilities into student e-commerce projects.              |  
`;

function Dev() {
  return (
    <>
      <div className="content-container flex flex-col gap-2">
        <h1>Introduction to MzuniPay</h1>

        <p>
          MzuniPay is a free payment gateway system specifically designed for
          students at Mzuzu University. It addresses common challenges students
          encounter when incorporating online transactions into their e-commerce
          projects, such as:
        </p>
        <ul className="list-disc pl-8">
          <li>
            <b>High costs</b> associated with existing payment gateways.
          </li>
          <li>
            <b>Technical complexity</b> in integrating those gateways.
          </li>
        </ul>
      </div>

      <div className="content-container flex flex-col gap-2">
        <h1>Main Features</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{table}</ReactMarkdown>
      </div>
    </>
  );
}

export default Dev;
