import React, { useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'default',
  showCloseButton = true 
}) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    default: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={cn(
            'relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full',
            'transform transition-all duration-300 ease-out',
            'border border-gray-200 dark:border-gray-700',
            sizeClasses[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              {title && (
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Icon name="X" size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className={cn(
            'p-6',
            size === 'large' && 'max-h-[80vh] overflow-y-auto'
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
