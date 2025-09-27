'use client';
import * as React from "react";

const Label = React.forwardRef(({ htmlFor, children, ...props }, ref) => {
  return (
    <label ref={ref} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
});
Label.displayName = "Label";

export default Label;
