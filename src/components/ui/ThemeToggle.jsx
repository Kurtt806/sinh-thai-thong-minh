import { useTheme } from '@/hooks/useTheme.jsx';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="p-2"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Icon 
        name={theme === 'light' ? 'Moon' : 'Sun'} 
        size={20} 
        className="text-gray-600 dark:text-gray-400"
      />
    </Button>
  );
}
