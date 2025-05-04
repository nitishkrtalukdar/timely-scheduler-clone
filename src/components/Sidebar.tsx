
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Instagram, Twitter, Facebook, Linkedin, Settings } from "lucide-react";
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn("h-screen w-64 bg-white border-r border-gray-200 flex flex-col", className)}>
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-timely-purple">TimeLy</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="mb-6">
          <h2 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Content</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                <Clock className="h-4 w-4 mr-3" />
                <span>Scheduled</span>
              </Link>
            </li>
            <li>
              <Link to="/calendar" className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                <Calendar className="h-4 w-4 mr-3" />
                <span>Calendar</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Channels</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/channels/twitter" className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                <Twitter className="h-4 w-4 mr-3" />
                <span>Twitter</span>
              </Link>
            </li>
            <li>
              <Link to="/channels/instagram" className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                <Instagram className="h-4 w-4 mr-3" />
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to="/channels/facebook" className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                <Facebook className="h-4 w-4 mr-3" />
                <span>Facebook</span>
              </Link>
            </li>
            <li>
              <Link to="/channels/linkedin" className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                <Linkedin className="h-4 w-4 mr-3" />
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Link to="/settings" className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
          <Settings className="h-4 w-4 mr-3" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
