import type { InputHTMLAttributes } from "react";

const Input = ({...rest}: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="border-[1px] border-border shadow-md focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring rounded-lg p-3 text-md text-accent-foreground " {...rest} />;
};

export default Input;
