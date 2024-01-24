import { ButtonHTMLAttributes } from "react";

type ButtonVariants = "danger" | "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const VARIANTS = {
  primary: "bg-indigo-500 enabled:hover:bg-indigo-600",
  danger: "bg-red-500 enabled:hover:bg-red-600",
  secondary: "bg-zinc-700 enabled:hover:bg-zinc-600",
};

export function Button(props: ButtonProps) {
  const { type = "button", variant = "primary", ...rest } = props;

  return (
    <button
      type={type}
      className={`min-h-8 w-full cursor-pointer rounded-md ${VARIANTS[variant]} px-3 py-1.5 disabled:opacity-60 hover:transition-colors`}
      {...rest}
    />
  );
}
