import { Link, useLocation } from "react-router-dom";

function NavBar() {
  let location = useLocation();
  console.log(location);
  return (
    <h2 className="nav-bar">
      {
        location.pathname === '/' ?
        "Home" :
        <Link to='/'>
          &lt; Back
        </Link>
      }
    </h2>
  );
}

export default NavBar;