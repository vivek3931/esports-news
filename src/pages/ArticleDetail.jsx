import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { FiClock, FiUser, FiShare2, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ArticleDetail = () => {
    const { id } = useParams();

    // Mock data - replace with API call
    const article = {
        id,
        title: "The Evolution of Esports: What to Expect in 2025",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80",
        category: "Industry",
        date: "October 24, 2024",
        readTime: "5 min read",
        author: "Alex Chen",
        content: `
      <p class="mb-6">The esports industry has seen exponential growth over the past decade, transforming from niche LAN parties to global stadium-filling events. As we look towards 2025, several key trends are emerging that promise to reshape the landscape of competitive gaming once again.</p>
      
      <h3 class="text-2xl font-bold text-white mb-4">The Rise of Mobile Esports</h3>
      <p class="mb-6">Mobile gaming continues to dominate the global market, and esports is no exception. Titles like Mobile Legends: Bang Bang and PUBG Mobile are setting viewership records, particularly in Southeast Asia and Latin America. We expect this trend to expand globally, with major publishers investing heavily in mobile-first competitive titles.</p>
      
      <h3 class="text-2xl font-bold text-white mb-4">AI Integration in Training</h3>
      <p class="mb-6">Professional teams are increasingly turning to artificial intelligence to gain a competitive edge. AI-powered analytics tools are providing deeper insights into player performance, strategy optimization, and opponent analysis. By 2025, AI coaches could become a standard part of every top-tier team's support staff.</p>
      
      <h3 class="text-2xl font-bold text-white mb-4">Sustainable Ecosystems</h3>
      <p class="mb-6">The "esports winter" of 2023-2024 has forced the industry to prioritize sustainability over growth at all costs. We're seeing a shift towards more stable revenue models, including digital goods, co-streaming rights, and direct-to-fan monetization strategies.</p>
    `
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to="/news" className="inline-flex items-center text-text-secondary hover:text-white mb-6 transition-colors">
                    <FiArrowLeft className="mr-2" /> Back to News
                </Link>

                <div className="mb-8">
                    <span className="inline-block px-3 py-1 bg-accent-purple text-white text-xs font-bold rounded-full mb-4">
                        {article.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-white/10 py-4">
                        <div className="flex items-center gap-6 text-text-secondary text-sm">
                            <div className="flex items-center">
                                <FiUser className="mr-2" /> {article.author}
                            </div>
                            <div className="flex items-center">
                                <FiClock className="mr-2" /> {article.date} • {article.readTime}
                            </div>
                        </div>
                        <button className="text-text-secondary hover:text-accent-cyan transition-colors">
                            <FiShare2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-10">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div
                    className="prose prose-invert prose-lg max-w-none text-text-secondary"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </Layout>
    );
};

export default ArticleDetail;
