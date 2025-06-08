import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => (
  <CheckboxPrimitive.Root
    className={`
      peer h-4 w-4 shrink-0 rounded-sm border border-primary-500 ring-offset-background 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
      focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
      data-[state=checked]:bg-primary-500 data-[state=checked]:text-primary-foreground
      ${className}
    `}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={'flex items-center justify-center text-current'}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export { Checkbox };