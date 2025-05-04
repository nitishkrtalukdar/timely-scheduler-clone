
import React from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className={cn("flex-1 flex flex-col overflow-hidden")}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
