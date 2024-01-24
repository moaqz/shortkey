import { InputHTMLAttributes, forwardRef } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <input
        type={props.type || "text"}
        className="h-12 w-full rounded-md bg-zinc-800 pl-4 pr-14 text-lg placeholder:font-medium focus:outline-double focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 focus:aria-[invalid]:outline-red-500"
        ref={ref}
        {...props}
      />
    );
  },
);
