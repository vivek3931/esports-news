import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import LiveMatchesWidget from '../components/home/LiveMatchesWidget';
import NewsGrid from '../components/news/NewsGrid';
import { FiTrendingUp } from 'react-icons/fi';

const Home = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <HeroSection />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <FiTrendingUp className="text-accent-orange" />
                                Latest News
                            </h2>
                        </div>
                        <NewsGrid />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <LiveMatchesWidget />

                        {/* Newsletter Widget */}
                        <div className="mt-8 bg-gradient-to-br from-accent-purple/20 to-secondary rounded-xl p-6 border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-2">Join the Community</h3>
                            <p className="text-text-secondary text-sm mb-4">
                                Get the latest esports news delivered straight to your inbox.
                            </p>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-primary/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white mb-3 focus:border-accent-purple focus:outline-none"
                            />
                            <button className="w-full bg-accent-purple text-white font-bold py-2 rounded-lg hover:bg-accent-purple/90 transition-colors">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
