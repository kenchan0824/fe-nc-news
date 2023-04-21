function Loading() {
  return (
    <div className="loading-container">
      <img className="loading-items" src={`${window.location.origin}/loading.gif`} alt="" />
      <div className="loading-items" >
        Loading...
      </div>
    </div>
  );
}

export default Loading;