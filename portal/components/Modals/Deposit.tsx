"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import LoadingLight from "../ux/LoadingLight";
import useDepositModalStore from "@/states/depositModalStore";

function Deposit() {
  const { depositModalActive, setDepositModalActive } = useDepositModalStore();
  const [isLoading, setLoading] = useState(false);

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
            <div onClick={setDepositModalActive} className="cta-2">
              Cancel
            </div>
            <button type="submit" disabled={isLoading} className="cta">
              {isLoading ? <LoadingLight /> : "Deposit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Deposit;
