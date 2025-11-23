import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import Tournaments from './pages/Tournaments';
import TournamentDetail from './pages/TournamentDetail';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Streams from './pages/Streams';
import Industry from './pages/Industry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<ArticleDetail />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/:id" element={<TournamentDetail />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<TeamDetail />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/streams" element={<Streams />} />
        <Route path="/industry" element={<Industry />} />
      </Routes>
    </Router>
  );
}

export default App;
