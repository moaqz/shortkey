"use client";

import { nanoid } from "nanoid";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { DotsSpinner } from "~/components/common";
import { Button, TextInput } from "~/components/ui";

interface DeleteLinkProps {
  onSubmit?: () => Promise<void>;
}

interface DeleteLinkFormValues {
  verificationCode: string;
}

export function DeleteLinkForm(props: DeleteLinkProps) {
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<DeleteLinkFormValues>();
  const [randomVerificationCode, setRandomVerificationCode] = useState(
    nanoid(6),
  );

  const onSubmit: SubmitHandler<DeleteLinkFormValues> = async ({
    verificationCode,
  }) => {
    if (verificationCode !== randomVerificationCode) {
      setError("verificationCode", {
        message: "The verification code entered does not match.",
      });
      return;
    }

    console.log("submitting the form...");
    await props.onSubmit?.();
    resetField("verificationCode");
    setRandomVerificationCode(nanoid(6));
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-zinc-400">
        Deleting this link will remove all of its stats. This action cannot be
        undone.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="verification-code" className="block text-zinc-400">
            To verify, type{" "}
            <span className="font-semibold text-indigo-400">
              {randomVerificationCode}
            </span>{" "}
            in the box below.
          </label>

          <TextInput
            type="text"
            id="verification-code"
            {...register("verificationCode")}
          />

          {errors.verificationCode ? (
            <span className="text-red-500 font-medium text-sm">
              {errors.verificationCode.message}
            </span>
          ) : null}
        </div>

        <Button type="submit" disabled={isSubmitting} variant="danger">
          {isSubmitting ? <DotsSpinner /> : "Confirm"}
        </Button>
      </form>
    </div>
  );
}
