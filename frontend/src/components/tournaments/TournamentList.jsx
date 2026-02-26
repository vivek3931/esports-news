import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, Users } from 'lucide-react';
import backendApi from '../../services/api';

const TournamentList = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const { data } = await backendApi.get('/api/tournaments');
                setTournaments(data);
            } catch (error) {
                console.error("Failed to fetch tournaments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTournaments();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-white">Loading Tournaments...</div>;
    }

    if (tournaments.length === 0) {
        return <div className="text-center py-10 text-text-secondary">No tournaments available.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
                <Link key={tournament._id} to={`/tournaments/${tournament._id}`} className="group">
                    <div className="bg-secondary rounded-xl overflow-hidden border border-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-purple/20">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={tournament.league?.image_url || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"}
                                alt={tournament.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 right-3">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${tournament.status === 'running' ? 'bg-red-500 text-white animate-pulse' :
                                    tournament.status === 'upcoming' ? 'bg-accent-orange text-white' :
                                        'bg-white/20 text-white backdrop-blur-md'
                                    }`}>
                                    {tournament.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="text-accent-purple text-xs font-bold mb-2 uppercase tracking-wider">
                                {tournament.videogame?.name}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors line-clamp-2">
                                {tournament.name}
                            </h3>

                            <div className="space-y-2 text-sm text-text-secondary">
                                <div className="flex items-center">
                                    <Trophy className="mr-2 text-accent-orange" />
                                    <span>Prize Pool: <span className="text-white font-semibold">{tournament.tier === 'S' || tournament.tier === 'A' ? 'Major' : 'Minor'}</span></span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="mr-2 text-accent-cyan" />
                                    <span>{new Date(tournament.begin_at).toLocaleDateString()} - {new Date(tournament.end_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="mr-2 text-white" />
                                    <span>{tournament.tier} Tier</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TournamentList;
