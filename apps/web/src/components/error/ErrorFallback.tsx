import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import Button from '../ui/Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-card p-6 max-w-lg w-full">
        <div className="flex items-center justify-center mb-6">
          <AlertOctagon className="text-danger-500 w-16 h-16" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Something went wrong</h1>
        
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <p className="text-danger-800 text-sm font-mono break-all">
            {error.message}
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={resetErrorBoundary}
            variant="primary"
            fullWidth
            className="flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            fullWidth
            className="flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;