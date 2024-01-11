"use client";

import signupVerification from "@/actions/verification";
import CardMessage from "@/components/auth/card-message";
import CardWrapper from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

export default function NewVerification() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(function () {
    signupVerification(token).then((res) => {
      if (res) {
        setError(res.error as string);
        setSuccess(res.success as string);
      }
    });
  }, []);

  return (
    <CardWrapper
      cardTitle="Verification page"
      cardDescription=""
      backHrefLabel="Redirect to"
      backHrefLabelShort="Login"
      backHrefLink="/auth/login"
      hasSocialLink={false}
    >
      <div className="space-y-6">
        {!success && !error && (
          <div className="flex items-center justify-center">
            <PuffLoader />
          </div>
        )}

        {error && <CardMessage type="error" label={error} />}
        {success && <CardMessage type="success" label={success} />}
      </div>
    </CardWrapper>
  );
}
