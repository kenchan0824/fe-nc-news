import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getTopics } from "../api";

function NavBar() {
  const [allTopics, setAllTopics] = useState([]);
  const [currTopic, setCurrTopic] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      setCurrTopic("");
    } else if (pathname.startsWith("/topics/")) {
      const pathTopic = pathname.split('/')[2];
      setCurrTopic(pathTopic);
    }
  
    getTopics().then((topics) => setAllTopics(topics));
  }, []);

  function handleClick(event) {
    setCurrTopic(event.target.innerText);
  }

  const homeItem = currTopic === "" ?
    <span className="menu-item selected">home</span>
  : (
    <Link className="menu-item" to="/" onClick={() => setCurrTopic("")}>
      home
    </Link>
  );

  const topicItems = allTopics.map((topic) => {
    return (
      <span key={topic.slug}>
        <span className="menu-item">|</span>
        {currTopic === topic.slug ? (
          <span className="menu-item selected">{topic.slug}</span>
        ) : (
          <Link
            className="menu-item"
            to={`/topics/${topic.slug}/articles`}
            onClick={handleClick}
          >
            {topic.slug}
          </Link>
        )}
      </span>
    );
  });

  const homeBar = (
    <div className="nav-menu">
      {homeItem}
      {topicItems}
    </div>
  );

  const backTo = currTopic ? `/topics/${currTopic}/articles` : "/";
  const backBar = (
    <div className="nav-menu back">
      <Link className="menu-item" to={backTo}>
        &lt; back
      </Link>
    </div>
  );  

  return (
    <h2 className="nav-bar">
      {pathname.startsWith("/articles/") ? backBar : homeBar}
    </h2>
  );
}

export default NavBar;
