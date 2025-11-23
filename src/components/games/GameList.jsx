import { Link } from 'react-router-dom';
import { FiUsers, FiVideo } from 'react-icons/fi';

const GameList = () => {
    // Mock data
    const games = [
        {
            id: 1,
            name: "League of Legends",
            publisher: "Riot Games",
            genre: "MOBA",
            activeTournaments: 12,
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            name: "Counter-Strike 2",
            publisher: "Valve",
            genre: "FPS",
            activeTournaments: 8,
            image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            name: "VALORANT",
            publisher: "Riot Games",
            genre: "FPS",
            activeTournaments: 15,
            image: "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            name: "Dota 2",
            publisher: "Valve",
            genre: "MOBA",
            activeTournaments: 5,
            image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
                <Link key={game.id} to={`/games/${game.id}`} className="group">
                    <div className="bg-secondary rounded-xl overflow-hidden border border-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-orange/20">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={game.image}
                                alt={game.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-accent-orange transition-colors">
                                    {game.name}
                                </h3>
                                <p className="text-text-secondary text-sm">{game.publisher}</p>
                            </div>
                        </div>

                        <div className="p-4 grid grid-cols-2 gap-4 border-t border-white/5">
                            <div className="text-center">
                                <div className="text-xs text-text-secondary mb-1 flex justify-center items-center gap-1"><FiVideo /> Tournaments</div>
                                <div className="font-bold text-white">{game.activeTournaments}</div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-xs text-text-secondary mb-1 flex justify-center items-center gap-1"><FiUsers /> Genre</div>
                                <div className="font-bold text-white">{game.genre}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default GameList;
