import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetail />} />
      </Routes>
      
    </div>
  );
}

export default App;
