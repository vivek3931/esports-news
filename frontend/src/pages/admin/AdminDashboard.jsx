import { useState, useEffect } from 'react';
import backendApi from '../../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        tournaments: 0,
        teams: 0,
        games: 0,
        streams: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [t, tm, g, s] = await Promise.all([
                    backendApi.get('/api/tournaments'),
                    backendApi.get('/api/teams'),
                    backendApi.get('/api/games'),
                    backendApi.get('/api/matches/running')
                ]);

                setStats({
                    tournaments: t.data.length,
                    teams: tm.data.length,
                    games: g.data.length,
                    streams: s.data.length
                });
            } catch (error) {
                console.error('Error fetching stats', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-[#18181B] p-6 rounded-xl border border-white/5 shadow-lg">
                    <h3 className="text-text-secondary font-medium">Total Tournaments</h3>
                    <p className="text-4xl font-bold mt-2 text-accent-cyan">{stats.tournaments}</p>
                </div>

                <div className="bg-[#18181B] p-6 rounded-xl border border-white/5 shadow-lg">
                    <h3 className="text-text-secondary font-medium">Total Teams</h3>
                    <p className="text-4xl font-bold mt-2 text-accent-purple">{stats.teams}</p>
                </div>

                <div className="bg-[#18181B] p-6 rounded-xl border border-white/5 shadow-lg">
                    <h3 className="text-text-secondary font-medium">Total Games</h3>
                    <p className="text-4xl font-bold mt-2 text-accent-orange">{stats.games}</p>
                </div>

                <div className="bg-[#18181B] p-6 rounded-xl border border-white/5 shadow-lg">
                    <h3 className="text-text-secondary font-medium">Active Streams</h3>
                    <p className="text-4xl font-bold mt-2 text-red-500">{stats.streams}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
