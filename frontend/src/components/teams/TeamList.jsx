import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';
import backendApi from '../../services/api';

const TeamList = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const { data } = await backendApi.get('/api/teams');
                setTeams(data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-white">Loading Teams...</div>;
    }

    if (teams.length === 0) {
        return <div className="text-center py-10 text-text-secondary">No teams available.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
                <Link key={team._id} to={`/teams/${team._id}`} className="group">
                    <div className="bg-secondary rounded-xl p-6 border border-white/5 h-full flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-cyan/20">
                        <div className="w-24 h-24 rounded-full bg-primary p-4 mb-4 border border-white/10 group-hover:border-accent-cyan transition-colors">
                            <img
                                src={team.image_url || `https://placehold.co/100x100/000000/FFF?text=${team.acronym || 'TBD'}`}
                                alt={team.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors">
                            {team.name}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">{team.current_videogame?.name || 'Various'} • {team.location || 'Global'}</p>

                        <div className="grid grid-cols-2 gap-4 w-full mt-auto pt-4 border-t border-white/5">
                            <div>
                                <div className="text-xs text-text-secondary mb-1">Acronym</div>
                                <div className="text-lg font-bold text-white">{team.acronym || '-'}</div>
                            </div>
                            <div>
                                <div className="text-xs text-text-secondary mb-1">Status</div>
                                <div className="text-lg font-bold text-accent-orange">Active</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TeamList;
