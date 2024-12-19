"use client";

import Link from "next/link";
import { useState } from "react";
import LoadingLight from "@/components/ux/LoadingLight";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constants/constants";
import { setCookie } from "cookies-next/client";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setIsLoading(true); // Start loading
    setSuccess(false);
    setFailed(false);
    setShow(false);

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // const decodedToken = jwtDecode(data.access_token);
        setShow(true);
        setFailed(false);
        setSuccess(true);
        setErrorMessage("Welcome back!");
        setCookie("token", data.token)
        router.push("/");
      } else {
        setSuccess(false);
        setShow(true);
        setFailed(true);
        setErrorMessage(data.message);
        setIsError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setIsError("An error occurred. Please try again later.");
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-form-container">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 items-center login-signup-form"
      >
        <h2 className="">Login</h2>
        <div className="flex input-group flex-col gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="text"
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
            className="passord"
          />
        </div>

        {show ? (
          <span
            className={`${failed ? "failed" : success ? "success" : ""} w-full`}
          >
            {errorMessage}
          </span>
        ) : (
          ""
        )}

        <button disabled={isLoading} className="cta">
          {isLoading ? <LoadingLight /> : isError ? "Try again" : "Login"}
        </button>
        <Link className="mr-auto font-medium" href="/landing/signup">Create an account</Link>
      </form>
    </div>
  );
}

export default Login;
