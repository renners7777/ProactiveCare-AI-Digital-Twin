import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleToggleSidebar = () => setCollapsed(!collapsed);
    document.addEventListener('toggle-sidebar', handleToggleSidebar);
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      document.removeEventListener('toggle-sidebar', handleToggleSidebar);
      window.removeEventListener('resize', handleResize);
    };
  }, [collapsed]);

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? 'md:pl-16' : 'md:pl-64'
        }`}
      >
        <Header />
        <main 
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"
          role="main"
          id="main-content"
        >
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;