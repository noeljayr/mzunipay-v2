import {
  IconCircleCheck,
  IconCopy,
  IconDots,
  IconCheck,
  IconTrash,
} from "@tabler/icons-react";
import { formatDate } from "@/utils/formatDate";
import { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";
import Loading from "./ux/Loading";
type apiTypes = {
  api_key: string;
  status: string;
  created_at: string;
};

function APIKey(props: apiTypes) {
  const [copied, setCopied] = useState(false);
  const [optionsactive, setOptions] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const [isActive, setIsActive] = useState(false);
  const [isDeleted, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [deletAPIKey, setDeleteAPI] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          setIsActive(false); // Stop countdown when it reaches zero
          if (!isCancelled) {
            deleteAPIKeyRequest(); // Trigger delete only if not cancelled
          }
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isCancelled]);

  const startCountdown = () => {
    setCountdown(7); // Reset countdown to 7
    setIsActive(true); // Activate countdown
    setIsCancelled(false); // Ensure cancel flag is reset
  };

  function TriggerDelete() {
    setDeleteAPI(true);
    startCountdown();
  }

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

  const cancelDelete = () => {
    setIsCancelled(true); // Set cancel flag to prevent delete
    setDeleteAPI(false); // Close the delete notification
    setIsActive(false); // Stop the countdown
  };

  function deleteAPIKeyRequest() {}

  function setActiveAPI() {}

  return (
    <>
      {optionsactive ? (
        <div
          onClick={() => {
            setOptions(false);
          }}
          className="options-overlay"
        ></div>
      ) : null}

      <div className="apikey grid gap-2 relative">
        <span className="info flex flex-col gap-1 truncate">
          <span className="key truncate">{props.api_key}</span>
          <span className="created-on flex gap-2">
            <b>Created on: </b>
            <span className="opacity-70">{formatDate(props.created_at)}</span>
          </span>
        </span>

        {props.status === "Active" ? (
          <div className="cta-2">Active</div>
        ) : (
          <span></span>
        )}

        <span className="flex relative gap-2">
          {copied ? (
            <IconCheck className="copy-icon cursor-pointer" />
          ) : (
            <IconCopy onClick={()=>{handleCopy(props.api_key)}} className="cursor-pointer copy-icon" />
          )}
          <IconDots
            onClick={() => {
              setOptions(!optionsactive);
            }}
            className="cursor-pointer icon-dots"
          />
          <div
            className={`row-action-options ${
              optionsactive ? "options-active" : ""
            }`}
          >
            <span
              onClick={() => {
                setOptions(false);
                TriggerDelete();
              }}
              className={
                props.status === "Active"
                  ? "opacity-35 pointer-events-none"
                  : ""
              }
            >
              <IconTrash />
              Delete
            </span>
            <span
              onClick={() => {
                setActiveAPI();
              }}
              className={
                props.status === "Active"
                  ? "opacity-35 pointer-events-none"
                  : ""
              }
            >
              <IconCircleCheck />
              Activate
            </span>
          </div>
        </span>
      </div>

      {deletAPIKey && (
        <div className="delete-notification">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            "Something went wrong"
          ) : isDeleted ? (
            <span className="success">Account Deleted</span>
          ) : (
            <>
              <span>Deleting an API key can{`'`}t be undone</span>
              <span onClick={cancelDelete} className="success">
                Cancel {"("}
                <NumberFlow
                  format={{ notation: "standard", maximumFractionDigits: 0 }}
                  value={countdown}
                  trend={-1}
                  locales={"en-US"}
                  className="numberflow"
                />
                {")"}
              </span>
              <span className="bar"></span>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default APIKey;
