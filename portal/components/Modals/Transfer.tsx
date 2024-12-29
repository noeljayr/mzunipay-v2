"use client";
import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconHistory,
  IconSearch,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import LoadingLight from "../ux/LoadingLight";
import useTransferModalStore from "@/states/transferModalStore";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { formatAmountWithCommas } from "@/utils/formatNumber";
import { getCookie, setCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "@/constants/constants";
import Loading from "../ux/Loading";
import defaultAvatar from "@/public/avatars/default.png";
import useBalanceChangeState from "@/states/balanceChangeStore";

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

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function Transfer() {
  const token = getCookie("token");
  const user: TokenTypes = jwtDecode(token || "");

  const [receiver_identifier, setReceiverId] = useState("");
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const { transferModalActive, setTransferModalActive } =
    useTransferModalStore();
  const [isLoading, setLoading] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [recipient, setRecipient] = useState<userTypes>({
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

  const [recentRecepients, setRecentRecipients] = useState<userTypes[]>([]);
  const [currentStep, setCurrentStep] = useState("select-user");
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState("");
  const [projectedBalance, setProjectedBalance] = useState(balance);
  const [isMoreThanBalance, setIsMoreThanBalance] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [usersFetchLoading, setUsersFetchLoading] = useState(false);
  const [userError, setUserError] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [floatAmount, setFloatAmount] = useState<number>(0);
  const { setBalanceState } = useBalanceChangeState();

  useEffect(() => {
    setReceiverId(recipient.wallet.wallet_id);
  }, [recipient.wallet.wallet_id]);

  useEffect(() => {
    if (transferModalActive && searchQuery) {
      fetchRecentRecipients();
    }
  }, [transferModalActive]);

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
  }, [refresh, transferModalActive]);

  const fetchRecentRecipients = async () => {
    setUsersFetchLoading(true);
    setUserError(false);
    try {
      const response = await fetch(`${BASE_URL}/users/?query=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setRecentRecipients(data.users);
      } else {
        console.error("Failed to fetch users");
        setRecentRecipients([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setRecentRecipients([]);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    const parsedAmount = parseFloat(rawValue);
    setFloatAmount(parsedAmount);

    setAmount(formatAmountWithCommas(rawValue));
    if (!isNaN(parsedAmount)) {
      checkAmount(parsedAmount);
    } else {
      setIsMoreThanBalance(false);
      setProjectedBalance(balance);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
    if (searchTerm.length > 2) {
      fetchRecentRecipients();
    }
  };

  const checkAmount = (newAmount: number) => {
    if (newAmount > balance) {
      setIsMoreThanBalance(true);
      setProjectedBalance(balance);
    } else {
      setIsMoreThanBalance(false);
      setProjectedBalance(balance - newAmount);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const selectUser = (user: userTypes) => {
    setRecipient(user);
    setCurrentStep("enter-amount");

    const updatedRecipients = [
      user,
      ...recentRecepients.filter(
        (u) => u.wallet.wallet_id !== user.wallet.wallet_id
      ),
    ];
    setRecentRecipients(updatedRecipients);
    setCookie("recentRecipients", JSON.stringify(updatedRecipients), {
      maxAge: 7 * 24 * 60 * 60,
    }); // 1 week expiry
  };

  const handTransfer = async (e: any) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setFailed(false);
    setSuccess(false);
    setIsLoading(true);
    setShowMessage(false);

    if (transferModalActive) {
      try {
        const response = await fetch(`${BASE_URL}/transactions/transfer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiver_identifier,
            amount: floatAmount,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setShowMessage(true);
          setStatusMessage(data.message);
          setFailed(false);
          setSuccess(true);
          setBalanceState();
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

  const back = () => {
    if (currentStep === "select-user") {
      setTransferModalActive();
    } else {
      setCurrentStep("select-user");
    }
  };

  return (
    <>
      {transferModalActive ? (
        <div onClick={setTransferModalActive} className="modal-overlay"></div>
      ) : null}
      <div
        className={`modal ${
          transferModalActive ? "modal-active" : ""
        } transfer-modal`}
      >
        <h1 className="">
          <span onClick={back} className="close flex gap-1 font-normal">
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
                onClick={() => handleCopy(user.wallet_id)}
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
                  placeholder="Search a recipient by name, email or wallet ID"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <h3 className="opacity-70">Recipients</h3>
              <div className="recepients-container flex flex-col gap-3 h-full">
                {isLoading ? (
                  <Loading />
                ) : recentRecepients ? (
                  recentRecepients.map((recipient) =>
                    recipient.wallet.wallet_id === user.wallet_id ? (
                      <span
                        key={recipient.wallet.wallet_id}
                        className="hidden"
                      ></span>
                    ) : (
                      <div
                        key={recipient.wallet.wallet_id}
                        onClick={() => selectUser(recipient)}
                        className="flex gap-2 user cursor-pointer items-center"
                      >
                        <span className="avatar">
                          <Image
                            alt={recipient.user.avatar || "default"}
                            src={
                              recipient.user.avatar
                                ? require(`@/public/avatars/${recipient.user.avatar}.png`)
                                : defaultAvatar
                            }
                          />
                        </span>
                        <span className="flex flex-col">
                          <span className="name">
                            {recipient.user.first_name +
                              " " +
                              recipient.user.last_name}
                          </span>
                          <span className="wallet opacity-50">
                            {recipient.wallet.wallet_id}
                          </span>
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <div className="empty">
                    <IconHistory />
                  </div>
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
            <form onSubmit={handTransfer} className="flex">
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
                      Amount cannot exceed your balance!
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
                  <div onClick={setTransferModalActive} className="cta-2">
                    Close
                  </div>
                  <button type="submit" disabled={loading} className="cta">
                    {loading ? <LoadingLight /> : "Transfer"}
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Transfer;
