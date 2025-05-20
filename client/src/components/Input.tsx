import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const defaultClasses = "rounded px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-violet-500 transition";

export const Input: React.FC<InputProps> = ({
  className = "",
  ...props
}) => {
  return (
    <input className={`${defaultClasses} ${className}`} {...props} />
  );
};