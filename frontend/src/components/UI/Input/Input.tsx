import { cn } from '../../../lib/utils';
import React, { forwardRef, useState } from 'react';

import { Eye, EyeOff, Search } from 'lucide-react';
import { Spacer } from '../spacer/spacer';

type InputProps = {
  type: 'text' | 'password' | 'email' | 'textarea';
  inputType?: 'text' | 'password' | 'email' | 'textarea' | 'search';
  placeholder: string;
  className: string;
  label: string;
  error: string | undefined;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  defaultValue?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Input = forwardRef(
  (
    {
      type = 'text',
      placeholder,
      className,
      label,
      error = '',
      leftIcon,
      disabled = false,
      inputType = 'text',
      defaultValue,
      readOnly,
      onChange,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className={className}>
        <p className={cn([`${error && 'grow text-red-500'}`])}>{label}</p>
        <Spacer size={1} />
        <label
          className={cn([
            'input input-bordered flex items-center gap-2 relative',
            `${
              error
                ? ' border-red-500'
                : 'input input-bordered flex items-center gap-2'
            }`,
          ])}
        >
          {leftIcon}
          <input
            onChange={onChange}
            defaultValue={defaultValue ? defaultValue : ''}
            disabled={disabled}
            type={showPassword ? 'text' : type}
            className={cn(' w-full  grow', [
              `${error && ' text-red-500'}`,
              `${inputType === 'search' && 'pl-4'}`,
            ])}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={ref}
            {...props}
          />
          {inputType === 'search' && (
            <Search
              className={cn('absolute w-5 h-5 cursor-pointer left-2 top-3', [
                `${error && 'grow text-red-500'}`,
              ])}
            />
          )}
        </label>
        <Spacer size={1} />
        <p className='text-xs text-red-500'>{error}</p>

        {inputType === 'password' &&
          (showPassword ? (
            <EyeOff
              onClick={() => setShowPassword(false)}
              className={cn('absolute w-5 h-5 cursor-pointer top-0 right-0', [
                `${error && 'grow text-red-500'}`,
              ])}
            />
          ) : (
            <Eye
              onClick={() => setShowPassword(true)}
              className={cn('absolute w-5 h-5 cursor-pointer top-0 right-0', [
                `${error && 'grow text-red-500'}`,
              ])}
            />
          ))}
      </div>
    );
  }
);
