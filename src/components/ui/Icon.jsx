import * as LucideIcons from 'lucide-react';

export function Icon({ name, size = 20, className, ...props }) {
  const IconComponent = LucideIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return (
    <IconComponent
      size={size}
      className={className}
      {...props}
    />
  );
}
