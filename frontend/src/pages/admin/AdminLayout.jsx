import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiMonitor, FiVideo, FiArrowLeft, FiMenu, FiX } from 'react-icons/fi';

const AdminLayout = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <FiGrid /> },
        { name: 'Tournaments', path: '/admin/tournaments', icon: <FiMonitor /> },
        { name: 'Teams', path: '/admin/teams', icon: <FiUsers /> },
        { name: 'Games', path: '/admin/games', icon: <FiGrid /> },
        { name: 'Streams', path: '/admin/streams', icon: <FiVideo /> },
    ];

    return (
        <div className="h-screen bg-[#0E0E10] text-[#EFEFF1] flex overflow-hidden">
            {/* Mobile Overlay Background */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-[#18181B] border-r border-white/5 flex flex-col fixed md:relative z-50 h-full transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-6 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-accent-orange to-accent-cyan bg-clip-text text-transparent">
                            Admin Panel
                        </h2>
                        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                            <FiX size={24} />
                        </button>
                    </div>
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? 'bg-accent-purple text-white'
                                    : 'text-text-secondary hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="w-full p-6 border-t border-white/5 mt-auto">
                    <Link to="/" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
                        <FiArrowLeft /> Back to Main Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full flex flex-col h-full">
                {/* Mobile Header Bar */}
                <div className="md:hidden p-4 border-b border-white/5 flex items-center bg-[#18181B]">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-gray-400 hover:text-white p-2 -ml-2 rounded-lg"
                    >
                        <FiMenu size={24} />
                    </button>
                    <span className="font-bold ml-2">Admin Dashboard</span>
                </div>

                <div className="p-4 sm:p-8 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
