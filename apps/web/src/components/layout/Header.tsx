import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BellRing, Settings, LogOut, ChevronDown, User, Menu } from 'lucide-react';
import { usePatient } from '../../contexts/PatientContext';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { alerts } = usePatient();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/patient/')) return 'Patient Detail';
    if (path === '/settings') return 'Settings';
    return 'ProactiveCare AI';
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-neutral-200 p-3 md:p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-3 p-2 hover:bg-neutral-100 rounded-lg"
          onClick={() => document.dispatchEvent(new CustomEvent('toggle-sidebar'))}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-neutral-800">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <a 
          href="https://bolt.new/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
          aria-label="Built with Bolt"
        >
          <img 
            src="/black_circle_360x360.png" 
            alt="Bolt Logo" 
            className="w-5 h-5 mr-1"
          />
        </a>

        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label={`Notifications ${alerts.length > 0 ? `(${alerts.length} new)` : ''}`}
          >
            <BellRing size={20} className="text-neutral-600" />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {alerts.length}
              </span>
            )}
          </button>
        </div>
        
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Settings"
        >
          <Settings size={20} className="text-neutral-600" />
        </button>
        
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
              <User size={16} />
            </div>
            <ChevronDown size={16} className="text-neutral-500 hidden md:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-neutral-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;