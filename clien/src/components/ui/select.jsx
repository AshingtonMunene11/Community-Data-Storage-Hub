"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { clsx } from "clsx";

const Select = ({ children, ...props }) => (
  <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
);

const SelectTrigger = React.forwardRef(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} className={clsx("border p-2 rounded", className)} {...props}>
    {children}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = SelectPrimitive.Value;
const SelectContent = SelectPrimitive.Content;
const SelectItem = SelectPrimitive.Item;

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
