import { type LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const defaultClasses = "block text-sm font-medium text-gray-700 mb-1";

export const Label: React.FC<LabelProps> = ({
  className = "",
  ...props
}) => {
  return (
    <label className={`${defaultClasses} ${className}`} {...props} />
  );
};