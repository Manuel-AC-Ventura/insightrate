import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const defaultClasses = "rounded px-4 py-2 bg-blue-600  hover:bg-blue-700 cursor-pointer transition";

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button className={`${defaultClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};