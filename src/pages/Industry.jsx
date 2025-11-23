import Layout from '../components/layout/Layout';
import NewsGrid from '../components/news/NewsGrid';

const Industry = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Esports Industry News</h1>
                    <p className="text-text-secondary">The latest business updates, roster changes, and sponsorship announcements.</p>
                </div>

                {/* Reusing NewsGrid but ideally would filter for 'Industry' category */}
                <NewsGrid />
            </div>
        </Layout>
    );
};

export default Industry;
