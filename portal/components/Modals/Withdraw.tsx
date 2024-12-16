"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import LoadingLight from "../ux/LoadingLight";
import useWidthdrawModalStore from "@/states/withdrawModalStore";

function Withdraw() {
  const { withdrawModalActive, setWithdrawModalActive } =
    useWidthdrawModalStore();
  const [isLoading, setLoading] = useState(false);

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

        <form className="flex gap-4" action="">
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
            <div onClick={setWithdrawModalActive} className="cta-2">
              Cancel
            </div>
            <button type="submit" disabled={isLoading} className="cta">
              {isLoading ? <LoadingLight /> : "Withdraw"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Withdraw;
