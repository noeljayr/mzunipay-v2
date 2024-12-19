"use client";
import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconHistory,
  IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import LoadingLight from "../ux/LoadingLight";
import useTransferModalStore from "@/states/transferModalStore";
import { usersData } from "@/constants/users";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { formatAmountWithCommas } from "@/utils/formatNumber";



type userTypes = {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    account_type: string;
    avatar: string;
  };
  wallet: {
    wallet_id: string;
  };
};

import { getCookie } from 'cookies-next/client';
import { jwtDecode } from "jwt-decode";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function Transfer() {
  const token = getCookie('token');
  const user: TokenTypes = jwtDecode(token || "");

  const { transferModalActive, setTransferModalActive } =
    useTransferModalStore();
  const [isLoading, setLoading] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [recipient, setRecipient] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      account_type: "",
      avatar: "",
    },
    wallet: {
      wallet_id: "",
    },
  });

  const [userData, setUserData] = useState<userTypes[]>(usersData);
  const [currentStep, setCurrentStep] = useState("select-user"); //enter-amount
  const [balance, setBalance] = useState<number>(10300);
  const [amount, setAmount] = useState("");
  const [projectedBalance, setProjectedBalance] = useState(balance);
  const [isMoreThanBalance, setIsMoreThanBalance] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clean and format the raw input
    const rawValue = e.target.value
      .replace(/[^0-9.]/g, "") // Allow only numbers and one decimal point
      .replace(/(\..*)\./g, "$1"); // Prevent multiple decimal points

    const parsedAmount = parseFloat(rawValue);

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

  const selectUser = (user: userTypes) => {
    setRecipient(user);
    setCurrentStep("enter-amount");
  };

  return (
    <>
      {transferModalActive ? (
        <div onClick={setTransferModalActive} className="modal-overlay"></div>
      ) : (
        <></>
      )}
      <div
        className={`modal ${
          transferModalActive ? "modal-active" : ""
        } transfer-modal`}
      >
        <h1 className="">
          <span
            onClick={() => {
              currentStep === "select-user"
                ? setTransferModalActive()
                : setCurrentStep("select-user")
            }}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>{" "}
          Transfer Funds
        </h1>

        {currentStep === "select-user" ? (
          <>
            <div className="wallet-id w-full flex gap-2 items-center">
              <span className="font-normal">Your wallet ID:</span>

              <span
                onClick={() => {
                  handleCopy(user.wallet_id);
                }}
                className="flex ml-auto items-center gap-2 cursor-pointer"
              >
                {isCopied ? <IconCheck /> : <IconCopy />}
                {user.wallet_id}
              </span>
            </div>

            <div className="recepients grid gap-2 p-2">
              <div className="search relative grid gap-2 p-2 items-center">
                <IconSearch />
                <input
                  className="flex items-center"
                  placeholder="Search a recipient by name, email or wallet ID "
                  type="text"
                />
              </div>
              <h3 className="opacity-70">Recent recipients</h3>

              <div className="recepients-container flex flex-col gap-3 h-full">
                {userData.length <= 0 ? (
                  <div className="empty">
                    <IconHistory />
                  </div>
                ) : (
                  userData.map((user) => {
                    return (
                      <div
                        key={user.wallet.wallet_id}
                        onClick={() => {
                          selectUser(user);
                        }}
                        className="flex gap-2 user cursor-pointer items-center"
                      >
                        <span className="avatar">
                          <Image
                            alt={user.user.avatar}
                            src={require(`@/public/avatars/${user.user.avatar}.png`)}
                          />
                        </span>
                        <span className="flex flex-col">
                          <span className="name">
                            {user.user.first_name + " " + user.user.last_name}
                          </span>
                          <span className="wallet opacity-50">
                            {user.wallet.wallet_id}
                          </span>
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        ) : currentStep === "enter-amount" ? (
          <>
            <div className="selected-user flex flex-col gap-2 items-center">
              <span className="avatar">
                <Image
                  alt="seal"
                  src={require(`@/public/avatars/${recipient.user.avatar}.png`)}
                />
              </span>
              <span className="flex flex-col items-center">
                <span className="name text-center font-semibold">
                  {recipient.user.first_name + " " + recipient.user.last_name}
                </span>
                <span className="wallet">{recipient.wallet.wallet_id}</span>
              </span>
            </div>

            <form action="" className="flex">
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
                    <span className="failed">Amount can not exceed your balance!</span>
                  )}
                </div>
              </div>

              <div className="modal-cta-container">
                <div onClick={setTransferModalActive} className="cta-2">
                  Cancel
                </div>
                <button type="submit" disabled={isLoading} className="cta">
                  {isLoading ? <LoadingLight /> : "Transfer funds"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Transfer;
