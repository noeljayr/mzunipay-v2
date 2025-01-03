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

function getActionText(
  transactionType: string,
  toWalletId: string,
  userWalletId: string
): string {
  switch (transactionType) {
    case "Payment":
      return "Paid ";
    case "Refund":
      return "Refunded ";
    case "Deposit":
      return "Deposited ";
    case "Withdrawal":
      return "Withdrew ";
    case "Peer-to-Peer":
      return toWalletId === userWalletId ? "Received " : "Sent ";
    default:
      return "";
  }
}

function getContextText(
  transactionType: string,
  toWalletId: string,
  fromWalletId: string,
  userWalletId: string
): string {
  switch (transactionType) {
    case "Payment":
      return "through merchant website";
    case "Refund":
      return toWalletId === userWalletId ? "By" : "";
    case "Deposit":
      return "to your wallet";
    case "Withdrawal":
      return "from your wallet";
    case "Peer-to-Peer":
      return toWalletId === userWalletId ? "from" : "to";
    default:
      return "";
  }
}

function getEntityText(
  transactionType: string,
  toWalletId: string,
  fromWalletId: string,
  senderName: string,
  receiverName: string,
  userWalletId: string
): string {
  switch (transactionType) {
    case "Payment":
      return toWalletId === userWalletId
        ? `by ${senderName}`
        : `to ${receiverName}`;
    case "Refund":
      return toWalletId === userWalletId ? fromWalletId : receiverName;
    case "Deposit":
    case "Withdrawal":
      return "";
    case "Peer-to-Peer":
      return toWalletId === userWalletId ? senderName : receiverName;
    default:
      return "";
  }
}

function getStatusClass(status: string): string {
  switch (status) {
    case "Completed":
      return "success";
    case "Failed":
      return "failed";
    default:
      return "pending";
  }
}

function getTransactionSign(toWalletId: string, userWalletId: string): string {
  return toWalletId === userWalletId ? "+" : "-";
}

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
                {getActionText(
                  props.transaction_type,
                  props.to_wallet_id,
                  user.wallet_id
                )}
              </b>
              {getContextText(
                props.transaction_type,
                props.to_wallet_id,
                props.from_wallet_id,
                user.wallet_id
              )}{" "}
              {getEntityText(
                props.transaction_type,
                props.to_wallet_id,
                props.from_wallet_id,
                props.sender_name,
                props.reciever_name,
                user.wallet_id
              )}
            </span>
            <span className="info flex gap-2 items-center">
              <span className={`status ${getStatusClass(props.status)}`}>
                {props.status}
              </span>
              <b className="opacity-50">•</b>
              <span className="time">{formatDate(props.created_at)}</span>
            </span>
          </div>

          <div className="amount font-medium">
            {getTransactionSign(props.to_wallet_id, user.wallet_id)}{" "}
            <span className="font-medium">
              K {formatAmountWithCommas(props.amount.toFixed(2))}
            </span>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default Transaction;
