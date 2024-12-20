"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import LoadingLight from "../ux/LoadingLight";
import useDepositModalStore from "@/states/depositModalStore";
import NumberFlow from "@number-flow/react";
import { BASE_URL } from "@/constants/constants";
import useBalanceChangeState from "@/states/balanceChangeStore";
import { getCookie } from "cookies-next/client";
import Loading from "../ux/Loading";
import Error from "../ux/Error";

function Deposit() {
  let token = getCookie("token");

  const { depositModalActive, setDepositModalActive } = useDepositModalStore();
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
  const [projectedBalance, setProjectedBalance] = useState(balance);
  const [floatAmount, setFloatAmount] = useState<number>(0);
  const {setBalanceState} = useBalanceChangeState()

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
      setProjectedBalance(balance); // Reset projection if invalid input
    }
  };

  const formatAmountWithCommas = (value: string) => {
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const checkAmount = (newAmount: number) => {
    if (newAmount <= 0) {
      setProjectedBalance(balance);
    } else {
      setProjectedBalance(balance + newAmount);
    }
  };

  const handleDeposit = async (e: any) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setFailed(false);
    setSuccess(false);
    setIsLoading(true);
    setShowMessage(false);

    try {
      const response = await fetch(`${BASE_URL}/wallets/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: floatAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowMessage(true);
        setStatusMessage(data.message);
        setFailed(false);
        setSuccess(true);
        setBalanceState()
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
  };

  useEffect(() => {
    const fetchBalance = async () => {
      setBalanceLoading(true);
      setBalanceError(false);

      if (depositModalActive) {
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
        } finally {
          setBalanceLoading(false);
        }
      }
    };

    fetchBalance();
  }, [refresh, depositModalActive, success]);

  return (
    <>
      {depositModalActive ? (
        <div onClick={setDepositModalActive} className="modal-overlay"></div>
      ) : (
        <></>
      )}
      <div
        className={`modal ${
          depositModalActive ? "modal-active" : ""
        } deposit-modal`}
      >
        <h1 className="">
          <span
            onClick={setDepositModalActive}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>{" "}
          Deposit Funds
        </h1>

        <form onSubmit={handleDeposit} className="flex gap-4" action="">
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
              <div className="modal-input-group deposit-amount">
                <span className="label">Amount</span>
                <div className="flex flex-col">
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
                </div>
              </div>
            </>
          )}

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
              <div onClick={setDepositModalActive} className="cta-2">
                Close
              </div>
              <button type="submit" disabled={isLoading} className="cta">
                {isLoading ? <LoadingLight /> : "Deposit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Deposit;
