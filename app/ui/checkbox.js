// app/ui/checkbox.js
import React from "react";

const Checkbox = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition duration-200 ${className}`}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
