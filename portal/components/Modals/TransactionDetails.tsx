"use client";
import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconReload,
} from "@tabler/icons-react";
import {
  useTransactionDetailsModalStore,
  useTransactionIDStore,
} from "@/states/transactionDetailsModalStore";
import { transactions } from "@/constants/transactions";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { formatAmountWithCommas } from "@/utils/formatNumber";
import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "@/constants/constants";
import Error from "../ux/Error";
import Loading from "../ux/Loading";
import useRefundModalStore from "@/states/refundModalStore";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

type TransactionProps = {
  to_wallet_id: string;
  reciever_name: string;
  sender_name: string;
  from_wallet_id: string;
  amount: number;
  status: string;
  transaction_type: string;
  created_at: string;
  description: string;
  tx_id: string;
};

function TransactionDetails() {
  const { transactionModalActive, setTransactionModalActive } =
    useTransactionDetailsModalStore();
  const [isCopied, setCopied] = useState(false);
  const [transaction, setTransaction] = useState<TransactionProps>();
  const { txId } = useTransactionIDStore();
  const token = getCookie("token");
  const user: TokenTypes = jwtDecode(token || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { setRefundModalActive } = useRefundModalStore();

  useEffect(() => {
    const fetchTransaction = async () => {
      setIsLoading(true);
      setNotFound(false);
      setIsError(false);

      if (transactionModalActive) {
        try {
          const response = await fetch(`${BASE_URL}/transactions/${txId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.status == 404) {
            setNotFound(true);
          } else {
            const paymentsResponse = await response.json();
            const paymentsData: TransactionProps =
              await paymentsResponse.transaction;
            setTransaction(paymentsData);
            console.log(paymentsData);
            setNotFound(false);
          }
        } catch (e: any) {
          console.log(e);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTransaction();
  }, [refresh, transactionModalActive]);

  function checkForRefundOption(
    to_wallet_id: string,
    transaction_type: string,
    status: string
  ) {
    const isRefundableTransaction =
      transaction_type === "Peer-to-Peer" || transaction_type === "Payment";

    if (
      status === "Completed" &&
      to_wallet_id === user.wallet_id &&
      isRefundableTransaction
    ) {
      return "cursor-pointer";
    }

    return "opacity-50 pointer-events-none";
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      setCopied(false);
    }
  };

  function getWalletID(to_wallet_id: string, from_wallet_id: string) {
    return to_wallet_id === user.wallet_id
      ? from_wallet_id
      : from_wallet_id === user.wallet_id
      ? to_wallet_id
      : "";
  }

  return (
    <>
      {transactionModalActive ? (
        <div
          onClick={setTransactionModalActive}
          className="modal-overlay"
        ></div>
      ) : (
        <></>
      )}
      <div
        className={`modal ${
          transactionModalActive ? "modal-active" : ""
        } transaction-details-modal`}
      >
        <h1 className="">
          <span
            onClick={setTransactionModalActive}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>{" "}
          Details
        </h1>

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loading />
          </div>
        ) : isError ? (
          <div
            onClick={() => {
              setRefresh(!refresh);
            }}
            className="flex w-full h-full items-center justify-center"
          >
            <Error />
          </div>
        ) : isNotFound ? (
          <span>Not found </span>
        ) : transaction ? (
          <>
            <div className="info flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="amount">
                  K {formatAmountWithCommas(transaction.amount.toString())}
                </span>
                <span
                  className={
                    transaction.status === "Completed" ? "success" : "failed"
                  }
                >
                  {transaction.status}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="opacity-70 font-bold">
                  {transaction.to_wallet_id === user.wallet_id
                    ? "From"
                    : transaction.from_wallet_id === user.wallet_id
                    ? "To"
                    : ""}
                </span>

                <span className="flex personal-details gap-2 justify-between">
                  <span>
                    {" "}
                    {transaction.to_wallet_id === user.wallet_id
                      ? transaction.sender_name
                      : transaction.from_wallet_id === user.wallet_id
                      ? transaction.reciever_name
                      : ""}
                  </span>

                  <b>|</b>
                  <span>Email</span>
                  <b>|</b>

                  <span className="w-fit flex gap-2 items-center">
                    {isCopied ? (
                      <IconCheck />
                    ) : (
                      <IconCopy
                        onClick={() => {
                          handleCopy(
                            getWalletID(
                              transaction.to_wallet_id,
                              transaction.from_wallet_id
                            )
                          );
                        }}
                        className="cursor-pointer"
                      />
                    )}
                    {getWalletID(
                      transaction.to_wallet_id,
                      transaction.from_wallet_id
                    )}
                  </span>
                </span>
              </div>

              <div
                onClick={() => {
                  setRefundModalActive();
                }}
                className={`refund-btn content-container flex gap-2 w-28 items-center justify-center ${checkForRefundOption(
                  transaction.to_wallet_id,
                  transaction.transaction_type,
                  transaction.status
                )}`}
              >
                <IconReload />
                Refund
              </div>
            </div>

            <div className="info flex-col gap-2">
              <span className="opacity-70 font-bold">Transaction Details</span>
              <span className="grid gap-2">
                <span className="opacity-70">Date & Time</span>
                <span>{formatDate(transaction.created_at)}</span>
              </span>

              <span className="grid gap-2">
                <span className="opacity-70">Description</span>
                <span className="">{transaction.description}</span>
              </span>

              <span className="grid gap-2 truncate">
                <span className="opacity-70">ID</span>
                <span className="truncate">{transaction.tx_id}</span>
              </span>

              <span className="grid gap-2 truncate">
                <span className="opacity-70">Type</span>
                <span className="truncate">{transaction.transaction_type}</span>
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default TransactionDetails;
