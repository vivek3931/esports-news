import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiSearch, FiUser, FiBell, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
                            </span>
                        </Link>
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
                            />
                        </div>

                        {/* Icons */}
                        <button className="p-2 text-text-secondary hover:text-white transition-colors relative">
                            <FiBell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-white transition-colors">
                            <FiUser size={20} />
                        </button>

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
                                <div className="flex items-center bg-primary rounded-lg px-3 py-2 border border-white/10">
                                    <FiSearch className="text-text-secondary" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-text-secondary w-full ml-2"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
