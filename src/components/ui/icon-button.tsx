import { ButtonHTMLAttributes } from "react";

export function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="rounded-full p-1.5 text-gray-200 hover:bg-zinc-700  hover:transition-colors focus:outline-double focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
      {...props}
    />
  );
}
