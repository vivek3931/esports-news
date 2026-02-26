import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FiTrendingUp, FiUsers, FiArrowLeft, FiTwitter, FiGlobe } from 'react-icons/fi';
import backendApi from '../services/api';

const TeamDetail = () => {
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                // Not ideal, but currently we fetch all and find the one because the backend doesn't have a GET /:id route natively built for public use yet.
                const { data } = await backendApi.get('/api/teams');
                const found = data.find(t => t._id === id);
                setTeam(found || null);
            } catch (error) {
                console.error("Failed to fetch team", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="flex h-screen items-center justify-center text-white">Loading Team Details...</div>
            </Layout>
        );
    }

    if (!team) {
        return (
            <Layout>
                <div className="flex h-screen items-center justify-center text-white">Team not found</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-secondary border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link to="/teams" className="inline-flex items-center text-text-secondary hover:text-white mb-6 transition-colors">
                        <FiArrowLeft className="mr-2" /> Back to Teams
                    </Link>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full bg-primary p-4 border border-white/10">
                            <img src={team.image_url || `https://placehold.co/150x150/000000/FFF?text=${team.acronym || 'TBD'}`} alt={team.name} className="w-full h-full object-contain" />
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl font-bold text-white mb-2">{team.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-text-secondary mb-4">
                                <span className="px-3 py-1 bg-white/5 rounded-full">{team.current_videogame?.name || 'Various'}</span>
                                <span className="px-3 py-1 bg-white/5 rounded-full">{team.location || 'Global'}</span>
                                <span className="flex items-center gap-1 text-accent-orange font-bold"><FiTrendingUp /> Active</span>
                            </div>
                            <p className="text-text-secondary max-w-2xl">{team.name} competes in {team.current_videogame?.name || 'various games'} around the world.</p>
                        </div>

                        <div className="flex gap-4">
                            <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors"><FiGlobe /></button>
                            <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors"><FiTwitter /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-bold text-white mb-6">Active Roster</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {team.players?.length > 0 ? team.players.map((player) => (
                        <div key={player.name} className="bg-secondary rounded-xl p-4 border border-white/5 hover:border-accent-cyan/50 transition-colors text-center">
                            <img src={player.image_url || `https://placehold.co/60x60/333/FFF?text=${player.name?.charAt(0) || 'P'}`} alt={player.name} className="w-16 h-16 rounded-full mx-auto mb-3 bg-primary" />
                            <h3 className="font-bold text-white">{player.name}</h3>
                            <p className="text-sm text-text-secondary">{player.role || 'Player'}</p>
                        </div>
                    )) : (
                        <div className="col-span-full py-8 text-center text-text-secondary">No players currently listed for this roster.</div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default TeamDetail;
