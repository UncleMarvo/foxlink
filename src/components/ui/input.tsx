import * as React from "react";

// This Input component is designed to be reusable and compatible with React Hook Form.
// It forwards refs and accepts all standard input props.
// The styling is consistent with shadcn/ui and Tailwind CSS conventions.

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={
          [
            // Basic shadcn/ui + Tailwind input styles
            "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "ring-offset-background placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          ].filter(Boolean).join(" ")
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input }; 