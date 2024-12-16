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
    balance: number;
    currency: string;
  };
};

function Transfer() {
  const { transferModalActive, setTransferModalActive } =
    useTransferModalStore();
  const [isLoading, setLoading] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState<userTypes[]>(usersData)

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
            onClick={setTransferModalActive}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>{" "}
          Transfer Funds
        </h1>

        <div className="wallet-id w-full flex gap-2 items-center">
          <span className="font-normal">Your wallet ID:</span>

          <span
            onClick={() => {
              handleCopy("933992385");
            }}
            className="flex ml-auto items-center gap-2 cursor-pointer"
          >
            {isCopied ? <IconCheck /> : <IconCopy />}
            933992385
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
            {
              userData.length <=0? 
              <div className="empty">
              <IconHistory />
            </div>:
            (
              userData.map((user)=>{
                return(
                  <div key={user.wallet.wallet_id} className="flex gap-2 user cursor-pointer items-center">
                    <span className="avatar">
                      <Image alt={user.user.first_name+ " " + user.user.last_name} src={require(`@/public/avatars/${user.user.avatar}.png`)}  />
                    </span>
                    <span className="flex flex-col">
                      <span className="name">{user.user.first_name+ " " +user.user.last_name}</span>
                      <span className="wallet opacity-50">{user.wallet.wallet_id}</span>
                    </span>
                  </div>
                )
              })
            )
            }
          </div>
        </div>

        {/* <form className="flex gap-4" action="">
          <div className="modal-input-group deposit-amount">
            <span className="label">Amount</span>
            <div className="flex flex-col">
              <input type="text" required placeholder="" />
              <span className="flex extra-info mt-1 gap-1">
                <span className="opacity-50">Your new balance</span>
                <b>K 10,300</b>
              </span>
            </div>
          </div>

          <div className="modal-cta-container">
            <div onClick={setTransferModalActive} className="cta-2">
              Cancel
            </div>
            <button type="submit" disabled={isLoading} className="cta">
              {isLoading ? <LoadingLight /> : "Deposit"}
            </button>
          </div>
        </form> */}
      </div>
    </>
  );
}

export default Transfer;
