"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import LoadingLight from "@/components/ux/LoadingLight";
import { BASE_URL } from "@/constants/constants";
import useSecurityModalStore from "@/context/securityModal";
import { getCookie } from "cookies-next/client";
import Error from "@/components/ux/Error";
import { isPasswordValid } from "@/utils/isPasswordValid";

function Security() {
  const token = getCookie("token");
  const { securityModalActive, setSecurityModalActive } =
    useSecurityModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");

  const handUpdate = async (e: any) => {
    e.preventDefault();
    setFailed(false);
    setSuccess(false);
    setShowMessage(false);

    if (isPasswordValid(newPassword)) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/users/update-password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });

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
        setUpdateError(true);
      } finally {
        setIsLoading(false);
      }
    } else {
        setFailed(true);
      setShowMessage(true);
      setStatusMessage("Password must not be less than 6 characters");
    }
  };

  return (
    <>
      {securityModalActive ? (
        <div onClick={setSecurityModalActive} className="modal-overlay"></div>
      ) : (
        <></>
      )}
      <div
        className={`modal ${
          securityModalActive ? "modal-active" : ""
        } update-profile-modal`}
      >
        <h1 className="">
          <span
            onClick={setSecurityModalActive}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>{" "}
          Security
        </h1>

        <form onSubmit={handUpdate} className="flex gap-4" action="">
          {updateError ? (
            <div
              onClick={() => {
                setRefresh(!refresh);
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <Error />
            </div>
          ) : (
            <>
              <div className="modal-input-group">
                <span className="label">Current Password</span>
                <div className="flex flex-col">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setcurrentPassword(e.target.value)}
                    required
                    placeholder=""
                  />
                </div>
              </div>

              <div className="modal-input-group">
                <span className="label">New Password</span>
                <div className="flex flex-col">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder=""
                  />
                </div>
              </div>

              <div className="modal-input-group two-fa opacity-60 cursor-not-allowed">
                <span className="label">2-Factor Authentication</span>
                <span className="checkbox ml-4">{/* <IconCheck /> */}</span>
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
              <div onClick={setSecurityModalActive} className="cta-2">
                Close
              </div>
              <button type="submit" disabled={isLoading} className="cta">
                {isLoading ? <LoadingLight /> : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Security;
