import React, { type HTMLInputTypeAttribute } from "react";
import type {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  form: UseFormReturn<T>;
}

const Input = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  form: {
    register,
    formState: { errors },
  },
}: Props<T>) => {
  const error = errors[name];
  const { message } = error || {};

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        className={`rounded bg-transparent p-2 outline outline-1 ${
          error ? "outline-red-300" : "outline-neutral-400"
        }`}
        {...register(name)}
      />
      {error && (
        <span className="text-sm font-normal text-red-400">
          {message as string}
        </span>
      )}
    </div>
  );
};

export default Input;
