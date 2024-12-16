import "@/css/transactions.css";
import Link from "next/link";
import Transaction from "./Transaction";

function TransactionHistory() {
  return (
    <div className="content-container transaction-history grid gap-2">
      <h3 className="opacity-70 flex">
        Transaction History
        <Link className="see-all-btn ml-auto" href="/transactions">
          See all
        </Link>
      </h3>
      <div className="transactions-container gap-2 grid">
        <Transaction />
      </div>
    </div>
  );
}

export default TransactionHistory;
