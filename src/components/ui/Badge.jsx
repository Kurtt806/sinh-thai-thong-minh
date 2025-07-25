import React from 'react';
import { cn } from '@/utils/cn';

const badgeVariants = {
  default: 'bg-moss-100 text-moss-800 dark:bg-moss-900/20 dark:text-moss-400',
  secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  destructive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  outline: 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
};

export function Badge({ 
  children, 
  variant = 'default', 
  className,
  ...props 
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
