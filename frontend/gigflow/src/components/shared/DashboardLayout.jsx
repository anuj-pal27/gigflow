import React from 'react';
import { Sparkles, Menu, LogOut } from 'lucide-react';

const DashboardLayout = ({ 
  role, 
  user,
  activeTab, 
  setActiveTab, 
  links, 
  onLogout, 
  headerActions,
  children 
}) => {
  return (
    <div className="min-h-screen bg-blue-50 font-sans text-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-4 border-black hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b-4 border-black">
          <div className="flex items-center gap-2 text-2xl font-black italic">
            <div className="w-8 h-8 bg-pink-500 border-2 border-black rounded-full flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            GigFlow
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="p-4 bg-yellow-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-black">
                {user?.name?.charAt(0)?.toUpperCase() || (role === 'client' ? 'CL' : 'FR')}
              </div>
              <div>
                <div className="font-black">{user?.name || 'User'}</div>
                <div className="text-xs font-bold uppercase text-gray-500">{role} Account</div>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {links.map(link => (
              <button 
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-3 p-3 font-bold rounded-lg border-2 transition-all
                  ${activeTab === link.id 
                    ? 'bg-blue-100 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-transparent border-transparent hover:bg-gray-50 hover:border-black/10'}
                `}
              >
                <link.icon size={20} />
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t-4 border-black">
          <button 
            onClick={onLogout} 
            className="w-full flex items-center gap-3 p-3 font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b-4 border-black p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="md:hidden font-black text-xl flex items-center gap-2">
            <Menu /> GigFlow
          </div>
          <div className="hidden md:block font-black text-xl uppercase tracking-widest text-gray-300">
            {activeTab.replace('-', ' ')}
          </div>
          <div className="flex items-center gap-4">
            {headerActions}
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

