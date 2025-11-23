import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import NewsGrid from '../components/news/NewsGrid';
import { FiFilter } from 'react-icons/fi';
import clsx from 'clsx';

const News = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'League of Legends', 'VALORANT', 'CS2', 'Dota 2', 'Industry'];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">All News</h1>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        <FiFilter className="text-text-secondary mr-2" />
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={clsx(
                                    'px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all',
                                    activeFilter === filter
                                        ? 'bg-accent-orange text-white'
                                        : 'bg-secondary text-text-secondary hover:bg-white/10 hover:text-white'
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <NewsGrid />

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 bg-secondary border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors">
                        Load More
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default News;
