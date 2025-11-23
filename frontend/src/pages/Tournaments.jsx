import { useState } from 'react';
import Layout from '../components/layout/Layout';
import TournamentList from '../components/tournaments/TournamentList';
import { FiFilter } from 'react-icons/fi';
import clsx from 'clsx';

const Tournaments = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Live', 'Upcoming', 'Completed'];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Tournaments</h1>

                    <div className="flex items-center gap-2">
                        <FiFilter className="text-text-secondary mr-2" />
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={clsx(
                                    'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                                    activeFilter === filter
                                        ? 'bg-accent-purple text-white'
                                        : 'bg-secondary text-text-secondary hover:bg-white/10 hover:text-white'
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <TournamentList />
            </div>
        </Layout>
    );
};

export default Tournaments;
