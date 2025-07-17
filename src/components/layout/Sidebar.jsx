import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '@/constants/dashboard';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

export function Sidebar({ collapsed = false, onToggle }) {
  const location = useLocation();
  
  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-moss-600 rounded-lg flex items-center justify-center shadow-sm">
              <Icon name="Leaf" size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100 font-vietnamese">
                Sinh Thái Thông Minh
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                by VI3D
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 bg-moss-600 rounded-lg flex items-center justify-center mx-auto shadow-sm">
            <Icon name="Leaf" size={20} className="text-white" />
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="mt-8 px-4">
        <div className="space-y-1">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200',
                location.pathname === item.path
                  ? 'bg-moss-50 dark:bg-moss-900/20 text-moss-700 dark:text-moss-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-moss-600 dark:hover:text-moss-400'
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon name={item.icon} size={20} className="flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3 font-vietnamese truncate">{item.title}</span>
              )}
            </Link>
          ))}
        </div>
      </nav>
      
      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={18} className="text-gray-600 dark:text-gray-400" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
