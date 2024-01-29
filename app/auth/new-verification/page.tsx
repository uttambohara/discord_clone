"use client";

import AuthMessage from "@/components/auth/auth-message";
import AuthWrapper from "@/components/auth/auth-wrapper";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PacManLoader from "react-spinners/PacmanLoader";

export default function NewVerification() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const searchParam = useSearchParams();
  const value = searchParam.get("token");

  useEffect(() => {
    async function verifyToken() {
      setSuccess("");
      setError("");
      try {
        await axios.post("/api/auth/new-verification", { token: value });
        setSuccess("Email verified.");
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          setError(err.response?.data);
        }
      }
    }
    verifyToken();
  }, []);

  return (
    <AuthWrapper
      title={"Verification page"}
      description={"Verifying your email..."}
      hasSocialIcons={false}
      backLinkLabel={"Back to login"}
      backLinkHref={"/auth/login"}
    >
      <div className="flex items-center justify-center">
        {!success && !error && <PacManLoader />}
        {success && <AuthMessage type="success" label={success} />}
        {error && <div className=" -rotate-6">{error}</div>}
      </div>
    </AuthWrapper>
  );
}
