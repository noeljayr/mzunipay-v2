"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constants/constants";
import LoadingLight from "@/components/ux/LoadingLight";
import { IconBuildingStore, IconUserCircle } from "@tabler/icons-react";
import { isPasswordValid } from "@/utils/isPasswordValid";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account_type, setAccountType] = useState("Customer");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);

  const handleSignup = async (e: any) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setFailed(false);

    if (isPasswordValid(password)) {
      setShowInvalidMessage(false);
      setSuccess(false);
      setIsLoading(true);
      setShowMessage(false);

      try {
        const response = await fetch(`${BASE_URL}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name,
            last_name,
            password,
            account_type,
          }),
        });

        const data = await response.json();
        console.log(response);

        if (response.ok) {
          setShowMessage(true);
          setStatusMessage(data.message);
          setFailed(false);
          setSuccess(true);
          router.push("/landing/login");
        } else {
          setShowMessage(true);
          setStatusMessage(data.message);
          setFailed(true);
          setIsError(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        setIsError("An error occurred. Please try again later.");
        console.error("Error logging in:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      setShowInvalidMessage(true);
    }
  };
  return (
    <div className="login-form-container">
      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center login-signup-form gap-3"
      >
        <h2 className="">Create an account</h2>
        <div className="account-type  grid gap-3">
          <div
            onClick={() => {
              setAccountType("Customer");
            }}
            className={`${account_type === "Customer" ? "selected" : ""}`}
          >
            <span className="selected-indicator"></span>
            <span className="icon mb-1">
              <IconUserCircle />
            </span>
            <b>Personal</b>
          </div>

          <div
            onClick={() => {
              setAccountType("Merchant");
            }}
            className={`${account_type === "Merchant" ? "selected" : ""}`}
          >
            <span className="selected-indicator"></span>
            <span className="icon mb-1">
              <IconBuildingStore />
            </span>
            <b>Business</b>
          </div>
        </div>
        <div className="grid gap-3 first-last w-full">
          <div className=" input-group flex-col gap-2">
            <input
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              placeholder="First name"
              className=""
            />
          </div>

          <div className=" input-group flex-col gap-2">
            <input
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              placeholder="Last name"
              className=""
            />
          </div>
        </div>

        <div className=" input-group flex-col gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Email"
            className=""
          />
        </div>

        <div className="flex input-group flex-col gap-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Password"
            className="password"
          />

          {!showInvalidMessage ? (
            <></>
          ) : (
            <>
              <span className="failed w-full">
                Password must not be less than 6 characters
              </span>
            </>
          )}
        </div>

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

        <button disabled={isLoading} className="cta">
          {isLoading ? <LoadingLight /> : isError ? "Try again" : "Signup"}
        </button>
        <Link className="mr-auto font-medium opacity-75" href="/landing/login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}

export default Signup;
