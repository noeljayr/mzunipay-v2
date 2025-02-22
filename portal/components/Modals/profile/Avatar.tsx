"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import LoadingLight from "@/components/ux/LoadingLight";
import { BASE_URL } from "@/constants/constants";
import useSecurityModalStore from "@/context/securityModal";
import { getCookie } from "cookies-next/client";
import Error from "@/components/ux/Error";
import Image from "next/image";
import useAvatarModalStore from "@/context/avatarModal";
import { jwtDecode } from "jwt-decode";
import usePersonalDetailsModalStore from "@/context/personalDetailsModal";
import { setCookie } from "cookies-next/client";

const images = [
  "bee",
  "butterfly",
  "chameleon",
  "crab",
  "flower-pot",
  "perch",
  "rubber-ring",
  "seal",
  "snail",
  "squirrel",
  "sun",
  "turtle",
  "bear",
];

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function Avatar() {
  const token = getCookie("token");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { avatarModalActive, setAvatarModalActive } = useAvatarModalStore();
  const { detailsUpdated, setDetailsUpdate } = usePersonalDetailsModalStore();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    // Retrieve and decode the token after the component mounts
    const token = getCookie("token") as string | undefined;
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenTypes>(token);
        setAvatar(decodedToken.avatar);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, [detailsUpdated]);

  const handUpdate = async (e: any) => {
    e.preventDefault();
    setFailed(false);
    setSuccess(false);
    setShowMessage(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/users/edit-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowMessage(true);
        setStatusMessage(data.message);
        setFailed(false);
        setSuccess(true);
        setDetailsUpdate();
        setCookie("token", data.token);
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
  };

  return (
    <>
      {avatarModalActive ? (
        <div onClick={setAvatarModalActive} className="modal-overlay"></div>
      ) : (
        <></>
      )}
      <div
        className={`modal ${
          avatarModalActive ? "modal-active" : ""
        } update-profile-modal`}
      >
        <h1 className="">
          <span
            onClick={setAvatarModalActive}
            className="close flex gap-1 font-normal"
          >
            <IconArrowLeft />
            Back
          </span>
          Avatar
        </h1>

        <form onSubmit={handUpdate} className="flex gap-4" action="">
          <div className="avatar-container grid gap-4">
            {images.map((name) => (
              <span
                onClick={() => {
                  setAvatar(name);
                }}
                key={name}
                className={`profile-avatar cursor-pointer ${
                  avatar === name ? "selected-avatar" : ""
                }`}
              >
                <Image
                  src={`/avatars/${name}.png`}
                  alt={name}
                  width={100}
                  height={100}
                />
              </span>
            ))}
          </div>

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
            <></>
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
              <div onClick={setAvatarModalActive} className="cta-2">
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

export default Avatar;
