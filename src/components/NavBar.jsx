import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTopics } from "../api";

function NavBar() {
  const [allTopics, setAllTopics] = useState([]);
  const [currTopic, setCurrTopic] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    getTopics().then((topics) => setAllTopics(topics));
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      setCurrTopic("");
    } else if (pathname.startsWith("/topics/")) {
      const pathTopic = pathname.split('/')[2];
      setCurrTopic(pathTopic);
    }
  }, [pathname]);  
  
  const homeItem = currTopic === "" ?
    <span className="menu-items selected">home</span>
  : (
    <Link className="menu-items" to="/" onClick={() => setCurrTopic("")}>
      home
    </Link>
  );

  const topicItems = allTopics.map((topic) => {
    return (
      <span key={topic.slug}>
        <span className="menu-items">|</span>
        {currTopic === topic.slug ? (
          <span className="menu-items selected">{topic.slug}</span>
        ) : (
          <Link
            className="menu-items"
            to={`/topics/${topic.slug}/articles`}
          >
            {topic.slug}
          </Link>
        )}
      </span>
    );
  });

  const homeBar = (
    <div className="nav-menu flex">
      {homeItem}
      {topicItems}
    </div>
  );

  const backTo = currTopic === "" ? "/" : `/topics/${currTopic}/articles`;
  const backBar = (
    <div className="nav-menu back flex">
      <Link className="menu-items" to={backTo}>
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
