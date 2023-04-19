import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getTopics } from "../api";

function NavBar() {
  const [allTopics, setAllTopics] = useState([]);
  const [currTopic, setCurrTopic] = useState("");
  const { pathname } = useLocation();
  
  useEffect(() => {
    getTopics()
      .then(topics => setAllTopics(topics));
  }, [])

  function handleClick(event) {
    setCurrTopic(event.target.innerText);
  }

  return (
    <h2 className="nav-bar">
      {
        pathname.startsWith('/articles/') ?
        <div className="nav-menu back">
          <Link class="menu-item" to='/'>
            &lt; back
          </Link>
        </div>
        :
          <div className="nav-menu">
            {
              pathname === '/'
              ?
              <span className="menu-item selected">home</span>
              :
              <Link className="menu-item" to="/" onClick={() => setCurrTopic("")} >
                home
              </Link> 
            }
            {
              allTopics.map((topic) => {
                  return (
                    <span key={topic.slug}>
                      <span className="menu-item">|</span>
                      {
                        currTopic === topic.slug
                        ?
                        <span className="menu-item selected">{topic.slug}</span>
                        :
                        <Link className="menu-item" to={`/topics/${topic.slug}/articles`} onClick={handleClick}>
                          {topic.slug}
                        </Link>
                      }
                    </span>
                  );
              })
            }
          </div>
      }
    </h2>
  );
}

export default NavBar;