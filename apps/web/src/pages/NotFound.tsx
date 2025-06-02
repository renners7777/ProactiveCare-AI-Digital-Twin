import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-primary-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-neutral-600 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button 
        onClick={() => navigate('/')}
        className="bg-primary-600 hover:bg-primary-700 text-white flex items-center"
      >
        <Home size={16} className="mr-2" />
        Return to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;