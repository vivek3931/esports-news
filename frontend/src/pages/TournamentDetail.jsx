import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Calendar, Trophy, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TournamentDetail = () => {
    const { id } = useParams();

    // Mock data
    const tournament = {
        id,
        name: "League of Legends World Championship 2024",
        game: "League of Legends",
        prizePool: "$2,225,000",
        dates: "Sep 25 - Nov 2, 2024",
        teams: 22,
        status: "Live",
        description: "The 2024 World Championship is the crowning event of League of Legends esports for the year. The tournament welcomes 22 teams from all regions of the game in a months-long race for the Summoner's Cup.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80"
    };

    return (
        <Layout>
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0">
                    <img src={tournament.image} alt={tournament.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="max-w-7xl mx-auto">
                        <Link to="/tournaments" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                            <ArrowLeft className="mr-2" /> Back to Tournaments
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-2">{tournament.name}</h1>
                        <div className="flex items-center gap-6 text-text-secondary">
                            <span className="text-accent-purple font-bold">{tournament.game}</span>
                            <span className="flex items-center"><Calendar className="mr-2" /> {tournament.dates}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-secondary rounded-xl p-6 border border-white/5 mb-8">
                            <h2 className="text-xl font-bold text-white mb-4">About Tournament</h2>
                            <p className="text-text-secondary leading-relaxed">{tournament.description}</p>
                        </div>

                        <div className="bg-secondary rounded-xl p-6 border border-white/5">
                            <h2 className="text-xl font-bold text-white mb-6">Bracket</h2>
                            {/* Simple Bracket Visualization */}
                            <div className="flex justify-between items-center overflow-x-auto pb-4">
                                <div className="flex flex-col gap-8 min-w-[150px]">
                                    <div className="bg-primary p-3 rounded border border-white/10">
                                        <div className="flex justify-between mb-1"><span className="font-bold text-white">T1</span> <span className="text-accent-orange">2</span></div>
                                        <div className="flex justify-between"><span className="text-text-secondary">G2</span> <span>0</span></div>
                                    </div>
                                    <div className="bg-primary p-3 rounded border border-white/10">
                                        <div className="flex justify-between mb-1"><span className="font-bold text-white">JDG</span> <span className="text-accent-orange">2</span></div>
                                        <div className="flex justify-between"><span className="text-text-secondary">KT</span> <span>1</span></div>
                                    </div>
                                </div>
                                <div className="w-8 h-0.5 bg-white/10"></div>
                                <div className="flex flex-col gap-8 min-w-[150px]">
                                    <div className="bg-primary p-3 rounded border border-white/10 mt-8">
                                        <div className="flex justify-between mb-1"><span className="font-bold text-white">T1</span> <span className="text-accent-orange">3</span></div>
                                        <div className="flex justify-between"><span className="text-text-secondary">JDG</span> <span>1</span></div>
                                    </div>
                                </div>
                                <div className="w-8 h-0.5 bg-white/10"></div>
                                <div className="flex flex-col gap-8 min-w-[150px]">
                                    <div className="bg-primary p-3 rounded border border-accent-orange/50 mt-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-1 bg-accent-orange text-[10px] text-white font-bold">WINNER</div>
                                        <div className="flex justify-between mb-1"><span className="font-bold text-white">T1</span> <span className="text-accent-orange">3</span></div>
                                        <div className="flex justify-between"><span className="text-text-secondary">WBG</span> <span>0</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-secondary rounded-xl p-6 border border-white/5 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4">Tournament Info</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-text-secondary flex items-center"><Trophy className="mr-2" /> Prize Pool</span>
                                    <span className="text-white font-bold">{tournament.prizePool}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-text-secondary flex items-center"><Users className="mr-2" /> Teams</span>
                                    <span className="text-white font-bold">{tournament.teams}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-text-secondary">Region</span>
                                    <span className="text-white font-bold">International</span>
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
