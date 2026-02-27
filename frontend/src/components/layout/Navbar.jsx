import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiBell, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navLinks = [
        { name: 'All News', path: '/news' },
        { name: 'Tournaments', path: '/tournaments' },
        { name: 'Teams', path: '/teams' },
        { name: 'Games', path: '/games' },
        { name: 'Industry', path: '/industry' },
        { name: 'Streams', path: '/streams', isNew: true },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-primary/95 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2">
<span className="text-2xl font-bold bg-gradient-to-r from-accent-orange to-accent-cyan bg-clip-text text-transparent">
                                ESPORTS<span className="text-white">NEWS</span>
                            </span>                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        clsx(
                                            'relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                                            isActive
                                                ? 'text-white'
                                                : 'text-text-secondary hover:text-white'
                                        )
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.name}
                                            {link.isNew && (
                                                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-accent-purple text-white rounded-full">
                                                    NEW
                                                </span>
                                            )}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-orange"
                                                    initial={false}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right Section: Search, Auth, Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        {/* Search Bar (Desktop) */}
                        <div className="hidden md:flex items-center bg-secondary rounded-full px-3 py-1.5 border border-white/10 focus-within:border-accent-cyan/50 transition-colors">
                            <FiSearch className="text-text-secondary" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-text-secondary w-32 lg:w-48"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        navigate(`/news?q=${encodeURIComponent(searchQuery.trim())}`);
                                    }
                                }}
                            />
                        </div>

                        {user ? (
                            <div className="flex items-center gap-4">
                                {user.isAdmin && (
                                    <Link to="/admin" className="px-3 py-1.5 text-xs font-bold bg-accent-orange/20 text-accent-orange border border-accent-orange/50 rounded-md hover:bg-accent-orange hover:text-white transition-colors">
                                        Admin Panel
                                    </Link>
                                )}
                                <Link to="/profile" className="flex items-center gap-2 group">
                                    <div className="h-8 w-8 rounded-full bg-accent-purple flex items-center justify-center text-sm font-bold text-white uppercase group-hover:ring-2 ring-accent-cyan transition-all">
                                        {user.name.charAt(0)}
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <Link to="/login" className="px-4 py-2 bg-accent-purple/90 hover:bg-accent-purple text-white text-sm font-medium rounded-md transition-colors">
                                Sign In
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-text-secondary hover:text-white transition-colors"
                            >
                                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-secondary border-b border-white/5 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        clsx(
                                            'block px-3 py-2 rounded-md text-base font-medium',
                                            isActive
                                                ? 'bg-white/10 text-white'
                                                : 'text-text-secondary hover:bg-white/5 hover:text-white'
                                        )
                                    }
                                >
                                    <div className="flex items-center justify-between">
                                        {link.name}
                                        {link.isNew && (
                                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent-purple text-white rounded-full">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                </NavLink>
                            ))}
                            <div className="mt-4 px-3">
                                <div className="flex items-center bg-primary rounded-lg px-3 py-2 border border-white/10 mb-4">
                                    <FiSearch className="text-text-secondary" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-text-secondary w-full ml-2"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && searchQuery.trim()) {
                                                navigate(`/news?q=${encodeURIComponent(searchQuery.trim())}`);
                                                setIsOpen(false);
                                            }
                                        }}
                                    />
                                </div>

                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 px-3 py-2 mb-2 text-white border-b border-white/10 pb-4">
                                            <div className="h-10 w-10 rounded-full bg-accent-purple flex items-center justify-center text-lg font-bold uppercase">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs text-text-secondary">{user.email}</div>
                                            </div>
                                        </div>
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsOpen(false)}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-white/5 hover:text-white"
                                        >
                                            Your Profile
                                        </Link>
                                        {user.isAdmin && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsOpen(false)}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-accent-orange hover:bg-white/5"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsOpen(false);
                                                navigate('/');
                                            }}
                                            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-white/5 hover:text-red-300"
                                        >
                                            Sign out
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-2 px-3 pt-2">
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-md transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-center px-4 py-2 bg-accent-purple hover:bg-accent-purple/90 text-white font-medium rounded-md transition-colors"
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
