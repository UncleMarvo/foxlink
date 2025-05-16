import React, { forwardRef } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ children, ...props }, ref) => {
  return (
    <label ref={ref} className="block text-sm font-medium text-gray-700" {...props}>
      {children}
    </label>
  );
});

Label.displayName = 'Label'; 