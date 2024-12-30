"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import LoadingLight from "../ux/LoadingLight";
import useRefundModalStore from "@/states/refundModalStore";
import { BASE_URL } from "@/constants/constants";
import { getCookie } from "cookies-next/client";
import Loading from "../ux/Loading";
import { useTransactionIDStore } from "@/states/transactionDetailsModalStore";

function Refund() {
  const token = getCookie("token");
  const { refundModalActive, setRefundModalActive } = useRefundModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [reason, setReason] = useState("");
  const { txId } = useTransactionIDStore();

  const handReasonChange = (e: any) => {
    setReason(e.target.value);
  };

  const refundTransaction = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setFailed(false);
    setSuccess(false);
    setShowMessage(false);

    console.log(txId);

    try {
      const response = await fetch(`${BASE_URL}/transactions/refund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          original_transaction_id: txId,
          reason: reason,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setSuccess(true);
        setStatusMessage(data.message);
      } else {
        setFailed(true);
        setStatusMessage(data.message);
      }
      setShowMessage(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {refundModalActive ? (
        <div onClick={setRefundModalActive} className="modal-overlay"></div>
      ) : (
        <></>
      )}
      <div
        className={`modal ${
          refundModalActive ? "modal-active" : ""
        } refund-modal`}
      >
        <h1 className="">
          <span
            onClick={setRefundModalActive}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>{" "}
          Refund
        </h1>

        <form onSubmit={refundTransaction} className="flex gap-4" action="">
          {
            <div className="modal-input-group reason">
              <span className="label">Reason</span>
              <div className="flex flex-col">
                <textarea
                  name="reason"
                  value={reason}
                  onChange={handReasonChange}
                  required
                  placeholder=""
                />
              </div>
            </div>
          }

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
              <div onClick={setRefundModalActive} className="cta-2">
                Close
              </div>
              <button type="submit" disabled={isLoading} className="cta">
                {isLoading ? <LoadingLight /> : "Refund"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Refund;
