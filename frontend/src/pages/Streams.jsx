import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FiUser, FiEye, FiFilter } from 'react-icons/fi';
import clsx from 'clsx';
import backendApi from '../services/api';

const Streams = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewedStreams, setViewedStreams] = useState(new Set());
    const filters = ['All', 'League of Legends', 'VALORANT', 'CS2', 'Dota 2', 'Just Chatting'];

    // Initialize viewed state from sessionStorage on mount
    useEffect(() => {
        const viewed = new Set();
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.startsWith('viewed_')) {
                viewed.add(key.replace('viewed_', ''));
            }
        }
        setViewedStreams(viewed);
    }, []);

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const { data } = await backendApi.get('/api/matches/running');
                // The stream mapping is handled by our backend streamRoutes which maps them to match PandaScore structure
                setStreams(data || []);
            } catch (error) {
                console.error("Failed to fetch streams", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStreams();
    }, []);

    const handleView = async (streamId) => {
        if (!viewedStreams.has(streamId)) {
            try {
                await backendApi.put(`/api/matches/${streamId}/view`);
                sessionStorage.setItem(`viewed_${streamId}`, 'true');
                setViewedStreams(prev => new Set(prev).add(streamId));

                // Optimistically update the local view count
                setStreams(prev => prev.map(s => {
                    if (s.id === streamId) {
                        const newList = [...s.streams_list];
                        newList[0] = { ...newList[0], views: (newList[0].views || 0) + 1 };
                        return { ...s, streams_list: newList };
                    }
                    return s;
                }));
            } catch (error) {
                console.error("Failed to count view", error);
            }
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex h-screen items-center justify-center text-white">Loading Streams...</div>
            </Layout>
        );
    }

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
                                {stream.streams_list?.[0]?.embed_url ? (
                                    <div className="w-full h-full relative" onClick={() => handleView(stream.id)}>
                                        <iframe
                                            src={stream.streams_list[0].embed_url}
                                            title={stream.name}
                                            className="w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            style={{ pointerEvents: viewedStreams.has(stream.id) ? 'auto' : 'none' }}
                                        ></iframe>
                                        {/* Overlay to catch the first click if not yet viewed */}
                                        {!viewedStreams.has(stream.id) && (
                                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="px-4 py-2 bg-accent-purple text-white font-bold rounded-lg shadow-lg">Click to interact</div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <img
                                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                                        alt={stream.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                                {stream.status === 'running' && (
                                    <div className="absolute top-2 left-2 pointer-events-none">
                                        <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center gap-1">
                                            LIVE
                                        </span>
                                    </div>
                                )}
                                <div className="absolute bottom-2 left-2 pointer-events-none">
                                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded flex items-center gap-1 transition-all">
                                        <FiEye /> {stream.streams_list?.[0]?.views || 0}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <img src={`https://placehold.co/50x50/333/FFF?text=${stream.streams_list?.[0]?.language?.charAt(0)?.toUpperCase() || 'S'}`} alt="avatar" className="w-10 h-10 rounded-full border border-white/10" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-bold truncate group-hover:text-accent-purple transition-colors leading-tight mb-1">
                                        {stream.name}
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-0.5">{stream.streams_list?.[0]?.language || 'TBD Channel'}</p>
                                    <p className="text-text-secondary text-xs">{stream.videogame?.name || 'TBD'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {streams.length === 0 && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-text-secondary py-10">
                            No channels streaming right now.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Streams;
