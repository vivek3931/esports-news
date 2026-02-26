import { useState, useEffect } from 'react';
import backendApi from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ManageStreams = () => {
    const [streams, setStreams] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        language: 'en',
        embed_url: '',
        raw_url: '',
        is_main: false,
        match_id: '',
        status: 'running'
    });

    const fetchData = async () => {
        try {
            const [streamsRes, tournamentsRes] = await Promise.all([
                backendApi.get('/api/matches/running'),
                backendApi.get('/api/tournaments')
            ]);
            setStreams(streamsRes.data);
            setTournaments(tournamentsRes.data);
            if (tournamentsRes.data.length > 0 && !formData.match_id) {
                setFormData(prev => ({ ...prev, match_id: tournamentsRes.data[0]._id }));
            }
        } catch (error) {
            console.error('Failed to fetch', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await backendApi.post('/api/matches', formData, config);
            fetchData();
            setFormData({ title: '', language: 'en', embed_url: '', raw_url: '', is_main: false, match_id: tournaments.length > 0 ? tournaments[0]._id : '', status: 'running' });
        } catch (error) {
            console.error('Failed to create', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await backendApi.delete(`/api/matches/${id}`, config);
            fetchData();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await backendApi.put(`/api/matches/${id}/toggle-status`, {}, config);
            fetchData();
        } catch (error) {
            console.error('Failed to toggle status', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-white">Manage Streams</h1>

            <div className="bg-[#18181B] p-6 rounded-xl border border-white/5 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Add New Stream</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Stream Title</label>
                        <input required type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Language</label>
                        <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })}>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="ru">Russian</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Associated Tournament</label>
                        <select required className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.match_id} onChange={(e) => setFormData({ ...formData, match_id: e.target.value })}>
                            <option value="" disabled>Select a tournament</option>
                            {tournaments.map(t => (
                                <option key={t._id} value={t._id}>{t.name} ({t.videogame?.name})</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Embed URL (e.g. Twitch player URL URL)</label>
                        <input required type="url" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.embed_url} onChange={(e) => setFormData({ ...formData, embed_url: e.target.value })} />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                        <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                            <option value="running">Live (Running)</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>
                    <div className="md:col-span-1 flex items-center mt-6">
                        <label className="flex items-center gap-2 text-gray-300">
                            <input type="checkbox" className="form-checkbox text-purple-600 rounded bg-gray-900 border-gray-700 focus:ring-purple-500" checked={formData.is_main} onChange={(e) => setFormData({ ...formData, is_main: e.target.checked })} />
                            <span>Mark as Main Stream</span>
                        </label>
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="bg-accent-purple hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
                            Add Stream
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-[#18181B] rounded-xl border border-white/5 shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-[#1E1E24]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Lang</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tournament</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : streams.map((s) => (
                            <tr key={s.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span>{s.name}</span>
                                        {s.streams_list[0]?.main && <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-0.5 rounded-full">Main</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400 uppercase">
                                    {s.streams_list[0]?.language}
                                    <span className={`ml-2 px-2 py-0.5 rounded text-xs text-white ${s.status === 'running' ? 'bg-red-500' : 'bg-gray-600'}`}>
                                        {s.status === 'running' ? 'LIVE' : 'OFFLINE'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{s.tournament?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                                    <button onClick={() => handleToggleStatus(s.id)} className="text-accent-cyan hover:text-cyan-400">Toggle Status</button>
                                    <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageStreams;
