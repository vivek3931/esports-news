import { useState, useEffect } from 'react';
import backendApi from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ManageTournaments = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        videogame: { name: '', slug: '' },
        begin_at: '',
        end_at: '',
        league: { name: '', image_url: '' },
        status: 'upcoming',
        tier: 'A'
    });

    const fetchTournaments = async () => {
        try {
            const { data } = await backendApi.get('/api/tournaments');
            setTournaments(data);
        } catch (error) {
            console.error('Failed to fetch', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await backendApi.post('/api/tournaments', formData, config);
            console.log('Server response:', res.data);
            fetchTournaments(); // Refresh list
            setFormData({ // Reset form
                name: '', videogame: { name: '', slug: '' }, begin_at: '', end_at: '', league: { name: '', image_url: '' }, status: 'upcoming', tier: 'A'
            });
        } catch (error) {
            console.error('Failed to create tournament:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || 'Failed to create tournament. Please check your inputs.'}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await backendApi.delete(`/api/tournaments/${id}`, config);
            fetchTournaments();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-white">Manage Tournaments</h1>

            {/* Create Form */}
            <div className="bg-[#18181B] p-6 rounded-xl border border-white/5 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Add New Tournament</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                        <input required type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                        <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                            <option value="upcoming">Upcoming</option>
                            <option value="running">Running</option>
                            <option value="finished">Finished</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Game Name</label>
                        <input required type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.videogame.name} onChange={(e) => setFormData({ ...formData, videogame: { ...formData.videogame, name: e.target.value } })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Game Slug</label>
                        <input required type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.videogame.slug} onChange={(e) => setFormData({ ...formData, videogame: { ...formData.videogame, slug: e.target.value } })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Begin Date</label>
                        <input required type="date" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.begin_at} onChange={(e) => setFormData({ ...formData, begin_at: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                        <input required type="date" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.end_at} onChange={(e) => setFormData({ ...formData, end_at: e.target.value })} />
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="bg-accent-purple hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
                            Add Tournament
                        </button>
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="bg-[#18181B] rounded-xl border border-white/5 shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-[#1E1E24]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Game</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : tournaments.map((t) => (
                            <tr key={t._id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">{t.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{t.videogame.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${t.status === 'running' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleDelete(t._id)} className="text-red-500 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTournaments;
