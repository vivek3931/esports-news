import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { getEsportsNews } from '../../services/newsApi';
import { formatDistanceToNow } from 'date-fns';

const NewsGrid = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const articles = await getEsportsNews({ pageSize: 8 });
                setNews(articles);
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-secondary rounded-xl overflow-hidden border border-white/5 h-96 animate-pulse">
                        <div className="h-48 bg-white/10"></div>
                        <div className="p-5 space-y-3">
                            <div className="h-4 w-1/3 bg-white/5 rounded"></div>
                            <div className="h-6 w-full bg-white/5 rounded"></div>
                            <div className="h-4 w-full bg-white/5 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
                <Link key={index} to={item.url} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="bg-secondary rounded-xl overflow-hidden border border-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-orange/10 flex flex-col">
                        <div className="relative h-48 overflow-hidden shrink-0">
                            <img
                                src={item.urlToImage || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'; }}
                            />
                            <div className="absolute top-3 left-3">
                                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded">
                                    {item.source.name}
                                </span>
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center text-text-secondary text-xs mb-3">
                                <FiClock className="mr-1" />
                                {item.publishedAt ? formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true }) : 'Recently'}
                                <span className="mx-2">•</span>
                                <span className="truncate max-w-[100px]">{item.author || 'Unknown'}</span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-accent-orange transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-text-secondary text-sm line-clamp-3 mb-4 flex-1">
                                {item.description}
                            </p>

                            <div className="flex items-center text-accent-cyan text-sm font-semibold group-hover:translate-x-1 transition-transform mt-auto">
                                Read More <FiArrowRight className="ml-1" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NewsGrid;

