import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-narrow center-block notfound">
      <span className="notfound-code">404</span>
      <h1>Page not found</h1>
      <p>The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Back to Home
      </Link>
    </div>
  );
}
