import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiVideo } from 'react-icons/fi';
import backendApi from '../../services/api';

const GameList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const { data } = await backendApi.get('/api/games');
                setGames(data);
            } catch (error) {
                console.error("Failed to fetch games:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-white">Loading Games...</div>;
    }

    if (games.length === 0) {
        return <div className="text-center py-10 text-text-secondary">No games available.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
                <Link key={game._id} to={`/games/${game._id}`} className="group">
                    <div className="bg-secondary rounded-xl overflow-hidden border border-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-orange/20">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={game.image_url || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"}
                                alt={game.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-accent-orange transition-colors">
                                    {game.name}
                                </h3>
                                <p className="text-text-secondary text-sm">Various Publishers</p>
                            </div>
                        </div>

                        <div className="p-4 grid grid-cols-2 gap-4 border-t border-white/5">
                            <div className="text-center">
                                <div className="text-xs text-text-secondary mb-1 flex justify-center items-center gap-1"><FiVideo /> Tournaments</div>
                                <div className="font-bold text-white">Active</div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-xs text-text-secondary mb-1 flex justify-center items-center gap-1"><FiUsers /> Genre</div>
                                <div className="font-bold text-white break-all">{game.slug}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default GameList;
