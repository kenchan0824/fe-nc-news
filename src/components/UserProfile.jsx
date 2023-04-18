function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div className="user-box dummy"></div>
      <div className="user-box welcome">
        <div><b>Welcome</b></div>
        <div>{user.name}!</div>
      </div>
      <div className="user-box">
        <img src={user.avatar_url} />
      </div>
    </div>
  );
}

export default UserProfile;