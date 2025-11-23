import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { FiArrowLeft, FiUsers, FiVideo, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const GameDetail = () => {
    const { id } = useParams();

    // Mock data
    const game = {
        id,
        name: "League of Legends",
        publisher: "Riot Games",
        genre: "MOBA",
        releaseDate: "2009",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with. Play now for free.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80",
        stats: {
            activePlayers: "150M+",
            tournaments: 12,
            viewership: "5.1M Peak"
        }
    };

    return (
        <Layout>
            <div className="relative h-[400px] w-full">
                <div className="absolute inset-0">
                    <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="max-w-7xl mx-auto">
                        <Link to="/games" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                            <FiArrowLeft className="mr-2" /> Back to Games
                        </Link>
                        <h1 className="text-5xl font-bold text-white mb-4">{game.name}</h1>
                        <div className="flex items-center gap-6 text-lg text-text-secondary">
                            <span>{game.publisher}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                            <span>{game.genre}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                            <span>{game.releaseDate}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">About the Game</h2>
                        <p className="text-text-secondary text-lg leading-relaxed mb-8">{game.description}</p>

                        <h2 className="text-2xl font-bold text-white mb-4">Latest News</h2>
                        <div className="bg-secondary rounded-xl p-6 border border-white/5 text-center text-text-secondary">
                            No recent news for this game.
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-secondary rounded-xl p-6 border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-6">Game Statistics</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary rounded-lg text-accent-orange">
                                        <FiUsers size={24} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-text-secondary">Active Players</div>
                                        <div className="text-xl font-bold text-white">{game.stats.activePlayers}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary rounded-lg text-accent-cyan">
                                        <FiVideo size={24} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-text-secondary">Active Tournaments</div>
                                        <div className="text-xl font-bold text-white">{game.stats.tournaments}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary rounded-lg text-accent-purple">
                                        <FiTrendingUp size={24} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-text-secondary">Peak Viewership</div>
                                        <div className="text-xl font-bold text-white">{game.stats.viewership}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default GameDetail;
