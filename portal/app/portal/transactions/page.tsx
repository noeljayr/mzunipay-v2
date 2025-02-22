"use client";

import "@/css/transactions.css";
import Transaction from "@/components/transactions/Transaction";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import TableRowLoading from "@/components/ux/TableRowLoading";
import Error from "@/components/ux/Error";
import { getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/constants";
import { useRouter, useSearchParams } from "next/navigation";


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

function page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const token = getCookie("token");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setNotFound(false);

      try {
        const response = await fetch(
          `${BASE_URL}/transactions?type=${activeFilter}&page=${page}&search=${searchTerm}`,
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
          console.log(paymentsResponse);
          const totalPages = await paymentsResponse.pagination.totalPages;
          setTransactions(paymentsData);
          setTotalPages(totalPages);
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
  }, [refresh, activeFilter, searchTerm, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
    console.log("search term is: " + searchTerm);
    router.push(`?page=1&search=${e.target.value}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}&search=${searchTerm}`);
  };

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const getPageNumbers = (currentPage: number, totalPages: number) => {
    const pages = [];
    if (totalPages <= 5) {
      // Show all pages if there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Show first, last, current, and adjacent pages with "..." as needed
      if (currentPage > 3) pages.push(1, "...");
      if (currentPage > 2) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push(currentPage + 1);
      if (currentPage < totalPages - 2) pages.push("...", totalPages);
    }
    return pages;
  };

  return (
    <>
      <div className="transactions h-full w-full grid gap-2">
        <div className="toolbar flex  justify-between w-full gap-2 max-sm:flex-col">
          <div className="search grid items-center gap-1">
            <IconSearch />
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for transactions"
              type="text"
            />
          </div>

          <div className="filters grid gap-2">
            <button
              onClick={() => {
                setActiveFilter("");
              }}
              className={`${activeFilter === "" ? "active-filter" : ""}`}
            >
              <span></span>
              All
            </button>
            <button
              onClick={() => {
                setActiveFilter("Refund");
              }}
              className={`${activeFilter === "Refund" ? "active-filter" : ""}`}
            >
              <span></span>
              Refunds
            </button>
            <button
              onClick={() => {
                setActiveFilter("Deposit");
              }}
              className={`${activeFilter === "Deposit" ? "active-filter" : ""}`}
            >
              <span></span>
              Deposits
            </button>
            <button
              onClick={() => {
                setActiveFilter("Withdrawal");
              }}
              className={`${
                activeFilter === "Withdrawal" ? "active-filter" : ""
              }`}
            >
              <span></span>
              Withdrawals
            </button>
            <button
              onClick={() => {
                setActiveFilter("Payment");
              }}
              className={`${activeFilter === "Payment" ? "active-filter" : ""}`}
            >
              <span></span>
              Payments
            </button>
          </div>
        </div>

        <div className="content-container h-full overflow-hidden transaction-history transaction-page grid gap-2">
          <h3 className="opacity-70 flex">Transaction History</h3>
          <div className="transactions-container custom-scrollbar overflow-y-auto gap-2 flex flex-col">
            {isLoading ? (
              <>
                <div className="grid w-full h-full gap-2">
                  <TableRowLoading />
                  <TableRowLoading />
                  <TableRowLoading />
                  <TableRowLoading />
                  <TableRowLoading />
                  <TableRowLoading />
                  <TableRowLoading />
                  <TableRowLoading />
                </div>
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

          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={isFirstPage}
              className="pagination-btn"
            >
              <IconChevronLeft />
            </button>

            {getPageNumbers(page, totalPages).map((pageNum, index) =>
              typeof pageNum === "number" ? (
                <button
                  key={index}
                  className={`pagination-btn ${
                    pageNum === page ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              ) : (
                <span key={index} className="pagination-ellipsis">
                  ...
                </span>
              )
            )}

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(page + 1)}
              disabled={isLastPage}
            >
              <IconChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
