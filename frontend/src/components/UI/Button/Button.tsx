import { Loader } from 'lucide-react';
import React from 'react';

type ButtonProps = {
  type?: 'submit' | 'button';
  className: string;
  loading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};
export function Button({
  className,
  loading,
  children,
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
    >
      {loading && <Loader className=' animate-spin' />} {children}
    </button>
  );
}
