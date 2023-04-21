import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import Error from "./components/Error";

function App() {

  return (
    <div className="App">
      <div className="app-container">
        <div className="banner">
          <Header />
          <UserProfile />
        </div>
        <NavBar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/topics/:topic_slug/articles" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<ArticleDetail />} />
          <Route path="*" element={
            <Error message="Oops, you're accessing the wrong path!" />
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
