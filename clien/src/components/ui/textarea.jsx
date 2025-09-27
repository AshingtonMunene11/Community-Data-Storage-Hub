'use client';
import * as React from "react";

const Textarea = React.forwardRef(({ value, onChange, placeholder, rows = 4, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
