import { useContext } from "react";
import { UserContext } from "../contexts/User";

function UserProfile() {
  const { user } = useContext(UserContext);

  return (
    <div className="user-profile flex">
      <div className="dummy"></div>
      <div>
        <div className="welcome">Welcome</div>
        <div className="username">{user.name}!</div>
      </div>
      <div>
        <img src={user.avatar_url} alt={user.name} />
      </div>
    </div>
  );
}

export default UserProfile;
