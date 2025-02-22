"use client";

import "@/css/transactions.css";
import Link from "next/link";
import Transaction from "./Transaction";
import { useState, useEffect } from "react";
import TableRowLoading from "@/components/ux/TableRowLoading";
import Error from "@/components/ux/Error";
import { useCookies } from "next-client-cookies";
import { BASE_URL } from "@/constants/constants";
import useBalanceChangeState from "@/context/balanceChangeStore";

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

function TransactionHistory() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const cookies = useCookies();
  const token = cookies.get("token");
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const { balanceChangeState } = useBalanceChangeState();

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setNotFound(false);

      try {
        const response = await fetch(
          `${BASE_URL}/transactions?limit=10?sort=desc?`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status == 404) {
          setNotFound(true);
          setTransactions([]); // Clear handouts when nothing is found
        } else {
          const paymentsResponse = await response.json();
          const paymentsData: TransactionProps[] =
            await paymentsResponse.transactions;
          setTransactions(paymentsData);
          console.log(paymentsData);
          setNotFound(false);
        }
      } catch (e: any) {
        console.log(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [refresh, balanceChangeState]);

  return (
    <div className="content-container transaction-history grid gap-2">
      <h3 className="opacity-70 flex">
        Transaction History
        <Link className="see-all-btn ml-auto" href="/portal/transactions">
          See all
        </Link>
      </h3>
      <div className="transactions-container gap-2 grid">
        {isLoading ? (
          <>
            <TableRowLoading />
            <TableRowLoading />
            <TableRowLoading />
            <TableRowLoading />
          </>
        ) : isError ? (
          <div
            className="mt-5"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <Error />
          </div>
        ) : isNotFound ? (
          <div className="not-found">No transactions found</div>
        ) : transactions ? (
          transactions.map((tx) => {
            return (
              <Transaction
                key={tx.tx_id}
                to_wallet_id={tx.to_wallet_id}
                from_wallet_id={tx.from_wallet_id}
                amount={tx.amount}
                status={tx.status}
                sender_name={tx.sender_name}
                reciever_name={tx.reciever_name}
                created_at={tx.created_at}
                tx_id={tx.tx_id}
                transaction_type={tx.transaction_type}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
