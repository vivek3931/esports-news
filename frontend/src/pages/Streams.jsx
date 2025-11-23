import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FiUser, FiEye, FiFilter } from 'react-icons/fi';
import clsx from 'clsx';

const Streams = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'League of Legends', 'VALORANT', 'CS2', 'Dota 2', 'Just Chatting'];

    // Mock data
    const streams = [
        {
            id: 1,
            streamer: "Tarik",
            title: "WATCH PARTY: VCT AMERICAS KICKOFF! | SENTINELS VS 100T",
            game: "VALORANT",
            viewers: "125K",
            thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
            avatar: "https://placehold.co/50x50/333/FFF?text=T"
        },
        {
            id: 2,
            streamer: "Caedrel",
            title: "LEC WINTER PLAYOFFS | G2 vs FNC | CO-STREAM",
            game: "League of Legends",
            viewers: "85K",
            thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
            avatar: "https://placehold.co/50x50/333/FFF?text=C"
        },
        {
            id: 3,
            streamer: "shroud",
            title: "Ranked Grind to Radiant",
            game: "VALORANT",
            viewers: "45K",
            thumbnail: "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?auto=format&fit=crop&w=800&q=80",
            avatar: "https://placehold.co/50x50/333/FFF?text=S"
        },
        {
            id: 4,
            streamer: "Gaules",
            title: "IEM KATOWICE 2024 - FURIA vs NAVI",
            game: "CS2",
            viewers: "110K",
            thumbnail: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=800&q=80",
            avatar: "https://placehold.co/50x50/333/FFF?text=G"
        }
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Live Streams</h1>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        <FiFilter className="text-text-secondary mr-2" />
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={clsx(
                                    'px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all',
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {streams.map((stream) => (
                        <div key={stream.id} className="group cursor-pointer">
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-white/5 group-hover:border-accent-purple/50 transition-all">
                                <img
                                    src={stream.thumbnail}
                                    alt={stream.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center gap-1">
                                        LIVE
                                    </span>
                                </div>
                                <div className="absolute bottom-2 left-2">
                                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded flex items-center gap-1">
                                        <FiEye /> {stream.viewers}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <img src={stream.avatar} alt={stream.streamer} className="w-10 h-10 rounded-full border border-white/10" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-bold truncate group-hover:text-accent-purple transition-colors leading-tight mb-1">
                                        {stream.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-0.5">{stream.streamer}</p>
                                    <p className="text-text-secondary text-xs">{stream.game}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Streams;
