import { useState, useEffect } from 'react';
import backendApi from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ManageGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        image_url: ''
    });

    const fetchGames = async () => {
        try {
            const { data } = await backendApi.get('/api/games');
            setGames(data);
        } catch (error) {
            console.error('Failed to fetch', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await backendApi.post('/api/games', formData, config);
            fetchGames();
            setFormData({ name: '', slug: '', image_url: '' });
        } catch (error) {
            console.error('Failed to create', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await backendApi.delete(`/api/games/${id}`, config);
            fetchGames();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-white">Manage Games</h1>

            <div className="bg-[#18181B] p-6 rounded-xl border border-white/5 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Add New Game</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                        <input required type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Slug (e.g. cs-go)</label>
                        <input required type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                        <input type="url" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="bg-accent-purple hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
                            Add Game
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-[#18181B] rounded-xl border border-white/5 shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-[#1E1E24]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Slug</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : games.map((g) => (
                            <tr key={g._id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {g.image_url && <img src={g.image_url} alt="" className="w-10 h-10 rounded-md object-cover" />}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{g.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{g.slug}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleDelete(g._id)} className="text-red-500 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageGames;
