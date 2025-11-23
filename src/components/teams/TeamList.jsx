import { Link } from 'react-router-dom';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';

const TeamList = () => {
    // Mock data
    const teams = [
        {
            id: 1,
            name: "T1",
            game: "League of Legends",
            region: "LCK",
            rank: 1,
            logo: "https://placehold.co/100x100/000000/FFF?text=T1",
            winRate: "78%"
        },
        {
            id: 2,
            name: "G2 Esports",
            game: "CS2",
            region: "EU",
            rank: 3,
            logo: "https://placehold.co/100x100/000000/FFF?text=G2",
            winRate: "65%"
        },
        {
            id: 3,
            name: "Sentinels",
            game: "VALORANT",
            region: "Americas",
            rank: 5,
            logo: "https://placehold.co/100x100/000000/FFF?text=SEN",
            winRate: "60%"
        },
        {
            id: 4,
            name: "Team Liquid",
            game: "Dota 2",
            region: "EU",
            rank: 2,
            logo: "https://placehold.co/100x100/000000/FFF?text=TL",
            winRate: "72%"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
                <Link key={team.id} to={`/teams/${team.id}`} className="group">
                    <div className="bg-secondary rounded-xl p-6 border border-white/5 h-full flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-cyan/20">
                        <div className="w-24 h-24 rounded-full bg-primary p-4 mb-4 border border-white/10 group-hover:border-accent-cyan transition-colors">
                            <img
                                src={team.logo}
                                alt={team.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors">
                            {team.name}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">{team.game} • {team.region}</p>

                        <div className="grid grid-cols-2 gap-4 w-full mt-auto pt-4 border-t border-white/5">
                            <div>
                                <div className="text-xs text-text-secondary mb-1">Global Rank</div>
                                <div className="text-lg font-bold text-white">#{team.rank}</div>
                            </div>
                            <div>
                                <div className="text-xs text-text-secondary mb-1">Win Rate</div>
                                <div className="text-lg font-bold text-accent-orange">{team.winRate}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TeamList;
