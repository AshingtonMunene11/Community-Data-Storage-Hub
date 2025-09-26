'use client';
import * as React from "react";

const Input = React.forwardRef(({ type = "text", value, onChange, placeholder, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
