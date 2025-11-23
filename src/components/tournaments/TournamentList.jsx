import { Link } from 'react-router-dom';
import { Calendar, Trophy, Users } from 'lucide-react';
const TournamentList = () => {
    // Mock data
    const tournaments = [
        {
            id: 1,
            name: "League of Legends World Championship 2024",
            game: "League of Legends",
            prizePool: "$2,225,000",
            dates: "Sep 25 - Nov 2, 2024",
            teams: 22,
            status: "Live",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            name: "The International 2024",
            game: "Dota 2",
            prizePool: "$18,930,775",
            dates: "Oct 12 - Oct 29, 2024",
            teams: 20,
            status: "Upcoming",
            image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            name: "VALORANT Champions 2024",
            game: "VALORANT",
            prizePool: "$1,000,000",
            dates: "Aug 6 - Aug 26, 2024",
            teams: 16,
            status: "Completed",
            image: "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
                <Link key={tournament.id} to={`/tournaments/${tournament.id}`} className="group">
                    <div className="bg-secondary rounded-xl overflow-hidden border border-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-purple/20">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={tournament.image}
                                alt={tournament.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 right-3">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${tournament.status === 'Live' ? 'bg-red-500 text-white animate-pulse' :
                                        tournament.status === 'Upcoming' ? 'bg-accent-orange text-white' :
                                            'bg-white/20 text-white backdrop-blur-md'
                                    }`}>
                                    {tournament.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="text-accent-purple text-xs font-bold mb-2 uppercase tracking-wider">
                                {tournament.game}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors">
                                {tournament.name}
                            </h3>

                            <div className="space-y-2 text-sm text-text-secondary">
                                <div className="flex items-center">
                                    <Trophy className="mr-2 text-accent-orange" />
                                    <span>Prize Pool: <span className="text-white font-semibold">{tournament.prizePool}</span></span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="mr-2 text-accent-cyan" />
                                    <span>{tournament.dates}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="mr-2 text-white" />
                                    <span>{tournament.teams} Teams</span>
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
