import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiRadio } from 'react-icons/fi';
import { getLiveMatches, getUpcomingMatches } from '../../services/pandaScoreApi';
import { format } from 'date-fns';

const LiveMatchesWidget = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const live = await getLiveMatches({ per_page: 3 });
                if (live.length < 3) {
                    const upcoming = await getUpcomingMatches({ per_page: 3 - live.length });
                    setMatches([...live, ...upcoming]);
                } else {
                    setMatches(live);
                }
            } catch (error) {
                console.error("Failed to fetch matches", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
        // Refresh every minute
        const interval = setInterval(fetchMatches, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="bg-secondary rounded-xl p-6 border border-white/5 h-auto animate-pulse">
                <div className="h-6 w-32 bg-white/10 rounded mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-white/5 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-secondary rounded-xl p-6 border border-white/5 h-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FiRadio className="text-accent-orange animate-pulse" />
                    Live Matches
                </h3>
                <Link to="/games" className="text-sm text-accent-cyan hover:underline">
                    View All
                </Link>
            </div>

            <div className="space-y-4">
                {matches.map((match) => {
                    const team1 = match.opponents[0]?.opponent;
                    const team2 = match.opponents[1]?.opponent;
                    const score1 = match.results[0]?.score || 0;
                    const score2 = match.results[1]?.score || 0;
                    const isLive = match.status === 'running';

                    return (
                        <div key={match.id} className="bg-primary/50 rounded-lg p-4 hover:bg-primary transition-colors border border-white/5">
                            <div className="flex justify-between items-center mb-2 text-xs text-text-secondary">
                                <span className="font-semibold text-accent-purple">{match.videogame.name}</span>
                                <span className="truncate max-w-[150px]">{match.league.name} - {match.serie.full_name}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                    <img
                                        src={team1?.image_url || 'https://placehold.co/40x40/000000/FFF?text=?'}
                                        alt={team1?.name || 'TBD'}
                                        className="w-8 h-8 rounded-full bg-white/10 object-contain p-1"
                                    />
                                    <span className="font-bold text-white truncate">{team1?.name || 'TBD'}</span>
                                </div>

                                <div className="px-3 py-1 bg-secondary rounded text-center min-w-[60px] mx-2">
                                    {isLive ? (
                                        <span className="text-accent-orange font-bold text-lg">
                                            {score1} - {score2}
                                        </span>
                                    ) : (
                                        <span className="text-text-secondary font-bold">VS</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 flex-1 justify-end overflow-hidden">
                                    <span className="font-bold text-white truncate text-right">{team2?.name || 'TBD'}</span>
                                    <img
                                        src={team2?.image_url || 'https://placehold.co/40x40/000000/FFF?text=?'}
                                        alt={team2?.name || 'TBD'}
                                        className="w-8 h-8 rounded-full bg-white/10 object-contain p-1"
                                    />
                                </div>
                            </div>

                            <div className="mt-2 text-center">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isLive ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                                    }`}>
                                    {isLive ? 'LIVE' : format(new Date(match.begin_at), 'MMM d, HH:mm')}
                                </span>
                            </div>
                        </div>
                    );
                })}
                {matches.length === 0 && (
                    <div className="text-center text-text-secondary py-8">
                        No live or upcoming matches found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveMatchesWidget;

