import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink, Outlet } from 'react-router-dom';
import { Activity, Heart, Moon, User } from 'lucide-react';

export function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold">ProactiveCare AI</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        
        <nav className="mt-6">
          <NavLink 
            to="/dashboard"
            end
            className={({ isActive }) => 
              `flex items-center px-4 py-2 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
            }
          >
            <Activity className="w-5 h-5 mr-3" />
            Overview
          </NavLink>

          <NavLink 
            to="/dashboard/health"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
            }
          >
            <Heart className="w-5 h-5 mr-3" />
            Health Metrics
          </NavLink>

          <NavLink 
            to="/dashboard/sleep"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
            }
          >
            <Moon className="w-5 h-5 mr-3" />
            Sleep Analysis
          </NavLink>

          <NavLink 
            to="/dashboard/profile"
            className={({ isActive }) => 
              `flex items-center px-4 py-2 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
            }
          >
            <User className="w-5 h-5 mr-3" />
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}