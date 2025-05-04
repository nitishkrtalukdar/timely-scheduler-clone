
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-2">
        <Button 
          variant="default" 
          size="sm" 
          className="bg-timely-purple hover:bg-timely-dark-purple text-white"
          asChild
        >
          <Link to="/create">
            <Plus className="h-4 w-4 mr-1" /> Create Post
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
