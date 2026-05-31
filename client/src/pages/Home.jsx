import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
      <div className="px-3 text-center">
        <h1>Welcome to the Cloud Event Platform</h1>
        <p className="lead">Manage and monitor your cloud events with ease.</p>
        <p className="lead">
          <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
        </p>
        <p>New to the site? <Link to="/register" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Register here</Link></p>
      </div>
    </div>
  );
}

export default Home;