"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import LoadingLight from "../ux/LoadingLight";
import useWidthdrawModalStore from "@/states/withdrawModalStore";
import NumberFlow from "@number-flow/react";
import { BASE_URL } from "@/constants/constants";
import { getCookie } from "cookies-next/client";
import Loading from "../ux/Loading";
import Error from "../ux/Error";

function Withdraw() {
  const token = getCookie("token");
  const { withdrawModalActive, setWithdrawModalActive } =
    useWidthdrawModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [amount, setAmount] = useState("");
  const [floatAmount, setFloatAmount] = useState<number>(0);
  const [projectedBalance, setProjectedBalance] = useState(balance);
  const [isMoreThanBalance, setIsMoreThanBalance] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clean and format the raw input
    const rawValue = e.target.value
      .replace(/[^0-9.]/g, "") // Allow only numbers and one decimal point
      .replace(/(\..*)\./g, "$1"); // Prevent multiple decimal points

    const parsedAmount = parseFloat(rawValue);
    setFloatAmount(parsedAmount);

    // Format the input for display
    setAmount(formatAmountWithCommas(rawValue));

    // Validate and update projection or display warnings
    if (!isNaN(parsedAmount)) {
      checkAmount(parsedAmount);
    } else {
      setIsMoreThanBalance(false);
      setProjectedBalance(balance); // Reset projection if invalid input
    }
  };

  const formatAmountWithCommas = (value: string) => {
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const checkAmount = (newAmount: number) => {
    // Ensure balance is not affected until confirmed
    if (newAmount > balance) {
      setIsMoreThanBalance(true); // Set the warning
      setProjectedBalance(balance); // Keep the current balance for projection
    } else {
      setIsMoreThanBalance(false);
      setProjectedBalance(balance - newAmount); // Show the projected balance
    }
  };

  const handleWithdraw = async (e: any) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setFailed(false);
    setSuccess(false);
    setIsLoading(true);
    setShowMessage(false);

    if (withdrawModalActive) {
      try {
        const response = await fetch(`${BASE_URL}/wallets/withdraw`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: floatAmount,
          }),
        });

        console.log(floatAmount);

        const data = await response.json();

        if (response.ok) {
          setShowMessage(true);
          setStatusMessage(data.message);
          setFailed(false);
          setSuccess(true);
        } else {
          setShowMessage(true);
          setStatusMessage(data.message);
          setFailed(true);
        }
      } catch (error) {
        setBalanceError(true);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };
  useEffect(() => {
    const fetchBalance = async () => {
      setBalanceLoading(true);
      setBalanceError(false);

      try {
        const response = await fetch(`${BASE_URL}/wallets/balance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setBalanceError(false);
          setBalance(data.balance);
          setProjectedBalance(data.balance);
        } else {
          setBalanceError(true);
        }
      } catch (error) {
        setBalanceError(true);
        console.error("Error logging in:", error);
      } finally {
        setBalanceLoading(false);
      }
    };

    fetchBalance();
  }, [refresh, withdrawModalActive]);

  return (
    <>
      {withdrawModalActive ? (
        <div onClick={setWithdrawModalActive} className="modal-overlay"></div>
      ) : (
        <></>
      )}
      <div
        className={`modal ${
          withdrawModalActive ? "modal-active" : ""
        } deposit-modal`}
      >
        <h1 className="">
          <span
            onClick={setWithdrawModalActive}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>{" "}
          Withdraw funds
        </h1>

        {balanceError ? (
          <div
            onClick={() => {
              setRefresh(!refresh);
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <Error />
          </div>
        ) : balanceLoading ? (
          <Loading />
        ) : (
          <>
            <form onSubmit={handleWithdraw} className="flex gap-4" action="">
              <div className="modal-input-group deposit-amount">
                <span className="label">Amount</span>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    required
                    placeholder=""
                  />
                  <span className="flex extra-info items-center mt-1 gap-1">
                    <span className="opacity-50">Your new balance</span>
                    <b>
                      {" "}
                      <NumberFlow
                        format={{
                          style: "currency",
                          currency: "MWk",
                          notation: "standard",
                          maximumFractionDigits: 2,
                        }}
                        trend={0}
                        locales={"en-US"}
                        value={projectedBalance}
                      />
                    </b>
                  </span>
                  {isMoreThanBalance && (
                    <span className="failed">
                      Amount can not exceed your balance!
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-2 ml-auto">
                {showMessage ? (
                  <span
                    className={`${
                      failed ? "failed" : success ? "success" : ""
                    } mb w-full`}
                  >
                    {statusMessage}
                  </span>
                ) : (
                  ""
                )}
                <div className="modal-cta-container">
                  <div onClick={setWithdrawModalActive} className="cta-2">
                    Close
                  </div>
                  <button type="submit" disabled={isLoading} className="cta">
                    {isLoading ? <LoadingLight /> : "Withdraw"}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default Withdraw;
