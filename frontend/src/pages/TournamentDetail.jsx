import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Calendar, Trophy, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import backendApi from '../services/api';

const TournamentDetail = () => {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                // Not ideal, but currently we fetch all and find the one because the backend doesn't have a GET /:id route natively built for public use yet.
                const { data } = await backendApi.get('/api/tournaments');
                const found = data.find(t => t._id === id);
                setTournament(found || null);
            } catch (error) {
                console.error("Failed to fetch tournament", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTournament();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="flex h-screen items-center justify-center text-white">Loading Tournament Details...</div>
            </Layout>
        );
    }

    if (!tournament) {
        return (
            <Layout>
                <div className="flex h-screen items-center justify-center text-white">Tournament not found</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0">
                    <img src={tournament.league?.image_url || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80"} alt={tournament.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="max-w-7xl mx-auto">
                        <Link to="/tournaments" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                            <ArrowLeft className="mr-2" /> Back to Tournaments
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-2">{tournament.name}</h1>
                        <div className="flex items-center gap-6 text-text-secondary">
                            <span className="text-accent-purple font-bold">{tournament.videogame?.name}</span>
                            <span className="flex items-center"><Calendar className="mr-2" /> {new Date(tournament.begin_at).toLocaleDateString()} - {new Date(tournament.end_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-secondary rounded-xl p-6 border border-white/5 mb-8">
                            <h2 className="text-xl font-bold text-white mb-4">About Tournament</h2>
                            <p className="text-text-secondary leading-relaxed">This tournament ({tournament.name}) is an officially sanctioned competitive event for {tournament.videogame?.name}. Hosted by the {tournament.league?.name || 'global'} league.</p>
                        </div>

                        <div className="bg-secondary rounded-xl p-6 border border-white/5">
                            <h2 className="text-xl font-bold text-white mb-6">Bracket</h2>
                            <div className="text-text-secondary text-center py-8">
                                Bracket information is not currently available for this tournament.
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-secondary rounded-xl p-6 border border-white/5 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4">Tournament Info</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-text-secondary flex items-center"><Trophy className="mr-2" /> Prize Pool</span>
                                    <span className="text-white font-bold">{tournament.tier === 'A' || tournament.tier === 'S' ? 'Major' : 'TBD'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-text-secondary flex items-center"><Users className="mr-2" /> Tier</span>
                                    <span className="text-white font-bold">{tournament.tier}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-text-secondary">League</span>
                                    <span className="text-white font-bold">{tournament.league?.name || 'International'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TournamentDetail;
