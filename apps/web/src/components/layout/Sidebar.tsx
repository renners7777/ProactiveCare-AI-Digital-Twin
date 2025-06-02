import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Users, ChevronLeft, ChevronRight, BarChart2, Settings, Home, Info } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  return (
    <>
      <aside 
        className={`fixed inset-y-0 left-0 z-30 bg-white border-r border-neutral-200 transition-all duration-300 transform ${
          collapsed ? 'w-16' : 'w-64'
        } ${
          collapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="p-4 border-b border-neutral-200">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-primary-600" aria-hidden="true" />
              <span className={`ml-2 font-semibold text-lg text-primary-800 ${collapsed ? 'hidden' : ''}`}>
                ProactiveCare
              </span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1" role="list">
            <NavItem to="/" icon={<Home />} label="Dashboard" collapsed={collapsed} />
            <NavItem to="/patients" icon={<Users />} label="Patients" collapsed={collapsed} />
            <NavItem to="/analytics" icon={<BarChart2 />} label="Analytics" collapsed={collapsed} />
            <NavItem to="/settings" icon={<Settings />} label="Settings" collapsed={collapsed} />
            <NavItem to="/about" icon={<Info />} label="About" collapsed={collapsed} />
          </ul>
        </nav>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-2 mx-auto mb-4 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>

      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden ${
          !collapsed ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCollapsed(true)}
        aria-hidden="true"
      />
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, collapsed }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => 
          `flex items-center px-4 py-2 ${
            isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-100'
          } transition-colors rounded-md mx-2 ${collapsed ? 'justify-center' : ''}`
        }
        aria-label={label}
        title={collapsed ? label : undefined}
      >
        <span className="w-5 h-5" aria-hidden="true">{icon}</span>
        <span className={`ml-3 ${collapsed ? 'hidden' : ''}`}>{label}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;