import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';
import { getTopHeadlines } from '../../services/newsApi';
import { formatDistanceToNow } from 'date-fns';

const HeroSection = () => {
    const [featuredNews, setFeaturedNews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                const articles = await getTopHeadlines({ pageSize: 5 });
                // Filter out articles without images
                const validArticles = articles.filter(article => article.urlToImage);
                setFeaturedNews(validArticles);
            } catch (error) {
                console.error("Failed to fetch headlines", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeadlines();
    }, []);

    useEffect(() => {
        if (featuredNews.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredNews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredNews]);

    const nextSlide = () => {
        if (featuredNews.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % featuredNews.length);
    };

    const prevSlide = () => {
        if (featuredNews.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
    };

    if (loading) {
        return (
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl mb-12 bg-secondary animate-pulse flex items-center justify-center">
                <div className="text-white/20">Loading Headlines...</div>
            </div>
        );
    }

    if (featuredNews.length === 0) {
        return (
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl mb-12 bg-secondary flex items-center justify-center border border-white/10">
                <div className="text-center p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">No Headlines Available</h3>
                    <p className="text-text-secondary">Unable to load top stories at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[500px] w-full overflow-hidden rounded-2xl mb-12 group">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10" />
                    <img
                        src={featuredNews[currentIndex].urlToImage}
                        alt={featuredNews[currentIndex].title}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12 w-full md:w-2/3">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-3 py-1 bg-accent-orange text-white text-xs font-bold rounded-full mb-4"
                        >
                            {featuredNews[currentIndex].source.name}
                        </motion.span>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
                        >
                            {featuredNews[currentIndex].title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-text-secondary text-lg mb-6 line-clamp-2"
                        >
                            {featuredNews[currentIndex].description}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center text-text-secondary text-sm"
                        >
                            <FiClock className="mr-2" />
                            {featuredNews[currentIndex].publishedAt ? formatDistanceToNow(new Date(featuredNews[currentIndex].publishedAt), { addSuffix: true }) : ''}
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-accent-orange cursor-pointer"
            >
                <FiChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-accent-orange cursor-pointer"
            >
                <FiChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 right-8 z-30 flex space-x-2">
                {featuredNews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${index === currentIndex ? 'bg-accent-orange w-8' : 'bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;

