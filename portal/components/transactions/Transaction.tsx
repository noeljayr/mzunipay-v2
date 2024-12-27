"use client";

import { formatDate } from "@/utils/formatDate";
import { formatAmountWithCommas } from "@/utils/formatNumber";
import {
  useTransactionDetailsModalStore,
  useTransactionIDStore,
} from "@/states/transactionDetailsModalStore";

import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";

type TransactionProps = {
  to_wallet_id: string;
  reciever_name: string;
  sender_name: string;
  from_wallet_id: string;
  amount: number;
  status: string;
  transaction_type: string;
  created_at: string;
  tx_id: string;
};

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function Transaction(props: TransactionProps) {
  const { setTransactionModalActive } = useTransactionDetailsModalStore();
  const { setTxId } = useTransactionIDStore();
  const token = getCookie("token");

  if (token) {
    const user: TokenTypes = jwtDecode(token);

    return (
      <>
        <div
          onClick={() => {
            setTransactionModalActive();
            setTxId(props.tx_id);
          }}
          className="transaction cursor-pointer grid items-center"
        >
          <div className="flex flex-col gap-1">
            <span className="destination">
              <b>
                {props.transaction_type === "Payment"
                  ? "Paid "
                  : props.transaction_type === "Refund"
                  ? "Refunded "
                  : props.transaction_type === "Deposit"
                  ? "Deposited "
                  : props.transaction_type === "Withdrawal"
                  ? "Withdrew "
                  : props.transaction_type === "Peer-to-Peer"
                  ? props.to_wallet_id === user.wallet_id
                    ? "Received "
                    : "Sent "
                  : ""}
              </b>
              {props.transaction_type === "Payment"
                ? "through merchant website"
                : props.transaction_type === "Refund"
                ? props.to_wallet_id === user.wallet_id
                  ? "By"
                  : ""
                : props.transaction_type === "Deposit"
                ? "to your wallet"
                : props.transaction_type === "Withdrawal"
                ? "from your wallet"
                : props.transaction_type === "Peer-to-Peer"
                ? props.to_wallet_id === user.wallet_id
                  ? "from"
                  : "to"
                : ""}{" "}
              {props.transaction_type === "Payment"
                ? props.to_wallet_id === user.wallet_id
                  ? "by " + props.sender_name
                  : "to " + props.reciever_name
                : props.transaction_type === "Refund"
                ? props.to_wallet_id === user.wallet_id
                  ? props.from_wallet_id
                  : props.reciever_name
                : props.transaction_type === "Deposit"
                ? ""
                : props.transaction_type === "Withdrawal"
                ? ""
                : props.transaction_type === "Peer-to-Peer"
                ? props.to_wallet_id === user.wallet_id
                  ? props.sender_name
                  : props.reciever_name
                : ""}
            </span>
            <span className="info flex gap-2 items-center">
              <span className={`status ${props.status === "Completed"? "success" : props.status === "Failed"? "failed" : "pending"}`}>{props.status}</span>
              <b className="opacity-50">•</b>
              <span className="time">{formatDate(props.created_at)}</span>
            </span>
          </div>

          <div className="amount font-medium">
            {props.to_wallet_id === user.wallet_id ? "+" : "-"}{" "}
            <span className="font-medium">
              K {formatAmountWithCommas(props.amount.toFixed(2))}
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Transaction;
