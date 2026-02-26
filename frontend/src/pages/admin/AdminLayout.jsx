import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiMonitor, FiVideo, FiArrowLeft } from 'react-icons/fi';

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <FiGrid /> },
        { name: 'Tournaments', path: '/admin/tournaments', icon: <FiMonitor /> },
        { name: 'Teams', path: '/admin/teams', icon: <FiUsers /> },
        { name: 'Games', path: '/admin/games', icon: <FiGrid /> },
        { name: 'Streams', path: '/admin/streams', icon: <FiVideo /> },
    ];

    return (
        <div className="h-screen bg-[#0E0E10] text-[#EFEFF1] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#18181B] border-r border-white/5 hidden md:flex flex-col">
                <div className="p-6 flex-1">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-accent-orange to-accent-cyan bg-clip-text text-transparent mb-6">
                        Admin Panel
                    </h2>
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
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
            <main className="flex-1 p-8 overflow-y-auto w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
