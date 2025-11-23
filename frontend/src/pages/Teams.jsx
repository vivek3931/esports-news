import { useState } from 'react';
import Layout from '../components/layout/Layout';
import TeamList from '../components/teams/TeamList';
import { FiSearch } from 'react-icons/fi';

const Teams = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Teams</h1>

                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search teams..."
                            className="bg-secondary border border-white/10 rounded-full pl-10 pr-4 py-2 text-white focus:border-accent-cyan focus:outline-none w-full md:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <TeamList />
            </div>
        </Layout>
    );
};

export default Teams;
