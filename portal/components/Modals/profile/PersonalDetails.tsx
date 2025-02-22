"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import LoadingLight from "@/components/ux/LoadingLight";
import { BASE_URL } from "@/constants/constants";
import usePersonalDetailsModal from "@/context/personalDetailsModal";
import { getCookie } from "cookies-next/client";
import Error from "@/components/ux/Error";
import { jwtDecode } from "jwt-decode";
import { splitFullName } from "@/utils/splitFullName";
import { setCookie } from "cookies-next/client";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
  email: string;
};

function PersonalDetails() {
  const token = getCookie("token");
  const {
    personalDetailsModalActive,
    setPersonalDetailsModalActive,
    setDetailsUpdate,
  } = usePersonalDetailsModal();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const handUpdate = async (e: any) => {
    e.preventDefault();
    setFailed(false);
    setSuccess(false);
    setIsLoading(true);
    setShowMessage(false);

    try {
      const response = await fetch(`${BASE_URL}/users/edit-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, first_name, last_name }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowMessage(true);
        setStatusMessage(data.message);
        setFailed(false);
        setSuccess(true);
        setCookie("token", data.token);
        setDetailsUpdate();
      } else {
        setShowMessage(true);
        setStatusMessage(data.message);
        setFailed(true);
      }
    } catch (error) {
      setUpdateError(true);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenTypes>(token);
        setEmail(decodedToken.email);
        const { userFirstName, userLastName } = splitFullName(
          decodedToken.full_name
        );
        setFirstName(userFirstName);
        setLastName(userLastName);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, []);

  return (
    <>
      {personalDetailsModalActive ? (
        <div
          onClick={setPersonalDetailsModalActive}
          className="modal-overlay"
        ></div>
      ) : (
        <></>
      )}
      <div
        className={`modal ${
          personalDetailsModalActive ? "modal-active" : ""
        } update-profile-modal`}
      >
        <h1 className="">
          <span
            onClick={setPersonalDetailsModalActive}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>{" "}
          Personal Details
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
                <span className="label">First Name</span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder=""
                  />
                </div>
              </div>

              <div className="modal-input-group">
                <span className="label">Last Name</span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder=""
                  />
                </div>
              </div>

              <div className="modal-input-group">
                <span className="label">Email</span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder=""
                  />
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
              <div onClick={setPersonalDetailsModalActive} className="cta-2">
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

export default PersonalDetails;
