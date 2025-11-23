import Layout from '../components/layout/Layout';
import GameList from '../components/games/GameList';

const Games = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-white mb-8">Esports Titles</h1>
                <GameList />
            </div>
        </Layout>
    );
};

export default Games;
