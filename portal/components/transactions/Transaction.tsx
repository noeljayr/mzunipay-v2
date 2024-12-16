import React from "react";

type TransactionTypes = {
  status: string;
  amount: number;
  date: string;
  flow: "out" | "in";
};

function Transaction() {
  return (
    <div className="transaction grid items-center">
      <div className="flex flex-col gap-1">
        <span className="destination">
          <b>Sent</b> to Bytes
        </span>
        <span className="info flex gap-2 items-center">
          <span className="status success">Completed</span>
          <b className="opacity-50">•</b>
          <span className="time">Just now</span>
        </span>
      </div>

      <div className="amount">
        - <span className="font-medium">K 7, 330.03</span>
      </div>
    </div>
  );
}

export default Transaction;
