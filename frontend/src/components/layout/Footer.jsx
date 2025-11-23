import { Link } from 'react-router-dom';
import { FaTwitter, FaTwitch, FaYoutube, FaDiscord, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-secondary border-t border-white/5 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-accent-orange to-accent-cyan bg-clip-text text-transparent">
                                ESPORTS<span className="text-white">NEWS</span>
                            </span>
                        </Link>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Your ultimate source for real-time esports news, tournament updates, and live scores. Stay ahead of the game.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/news" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">News</Link></li>
                            <li><Link to="/tournaments" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">Tournaments</Link></li>
                            <li><Link to="/teams" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">Teams</Link></li>
                            <li><Link to="/games" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">Games</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">Contact</Link></li>
                            <li><Link to="/privacy" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-text-secondary hover:text-accent-orange transition-colors text-sm">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
                        <p className="text-text-secondary text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-primary border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-accent-cyan focus:outline-none transition-colors"
                            />
                            <button
                                type="button"
                                className="bg-accent-orange text-white font-semibold py-2 rounded-lg hover:bg-accent-orange/90 transition-colors text-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-secondary text-sm">
                        &copy; {new Date().getFullYear()} EsportsNews. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-text-secondary hover:text-[#1DA1F2] transition-colors"><FaTwitter size={20} /></a>
                        <a href="#" className="text-text-secondary hover:text-[#9146FF] transition-colors"><FaTwitch size={20} /></a>
                        <a href="#" className="text-text-secondary hover:text-[#FF0000] transition-colors"><FaYoutube size={20} /></a>
                        <a href="#" className="text-text-secondary hover:text-[#5865F2] transition-colors"><FaDiscord size={20} /></a>
                        <a href="#" className="text-text-secondary hover:text-[#E1306C] transition-colors"><FaInstagram size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
