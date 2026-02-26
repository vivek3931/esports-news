import { useState, useEffect } from 'react';
import backendApi from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ManageTeams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        acronym: '',
        image_url: '',
        location: '',
        current_videogame: { name: '' }
    });

    const fetchTeams = async () => {
        try {
            const { data } = await backendApi.get('/api/teams');
            setTeams(data);
        } catch (error) {
            console.error('Failed to fetch', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await backendApi.post('/api/teams', formData, config);
            fetchTeams();
            setFormData({ name: '', acronym: '', image_url: '', location: '', current_videogame: { name: '' } });
        } catch (error) {
            console.error('Failed to create', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await backendApi.delete(`/api/teams/${id}`, config);
            fetchTeams();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-white">Manage Teams</h1>

            <div className="bg-[#18181B] p-6 rounded-xl border border-white/5 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Add New Team</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                        <input required type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Acronym</label>
                        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.acronym} onChange={(e) => setFormData({ ...formData, acronym: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Game Focus</label>
                        <input required type="text" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.current_videogame.name} onChange={(e) => setFormData({ ...formData, current_videogame: { name: e.target.value } })} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Logo URL</label>
                        <input type="url" className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="bg-accent-purple hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
                            Add Team
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-[#18181B] rounded-xl border border-white/5 shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-[#1E1E24]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acronym</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Game</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : teams.map((t) => (
                            <tr key={t._id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        {t.image_url && <img src={t.image_url} alt="" className="w-8 h-8 rounded bg-white/10 p-1 object-contain" />}
                                        <span>{t.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{t.acronym}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{t.current_videogame?.name}</td>
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

export default ManageTeams;
