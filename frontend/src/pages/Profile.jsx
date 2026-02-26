import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#0E0E10] text-[#EFEFF1] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-[#18181B] text-gray-400 hover:text-white rounded-lg transition-colors border border-gray-800 hover:border-gray-600"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <h1 className="text-3xl font-bold">User Profile</h1>
                </div>

                <div className="bg-[#18181B] rounded-xl overflow-hidden shadow-lg border border-gray-800 p-8">
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="h-24 w-24 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-bold text-white uppercase">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{user?.name}</h2>
                            <p className="text-gray-400">{user?.email}</p>
                            <div className={`mt-2 text-xs px-3 py-1 rounded-full inline-block font-semibold ${user?.isAdmin ? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30' : 'bg-purple-500/20 text-purple-400'}`}>
                                {user?.isAdmin ? 'Administrator' : 'Member'}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 mt-6">
                        <h3 className="text-xl font-semibold mb-4 text-white">Account Details</h3>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-400">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-100">{user?.name}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-400">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-100">{user?.email}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex justify-end gap-4">
                        {user?.isAdmin && (
                            <button
                                onClick={() => navigate('/admin')}
                                className="px-4 py-2 border border-accent-orange text-accent-orange rounded-md hover:bg-accent-orange hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-gray-900"
                            >
                                Admin Dashboard
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
