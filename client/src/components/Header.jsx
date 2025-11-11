import { Link } from 'react-router-dom';
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  return(
    <>
      <header className="header">
        <div className="container">
          <nav className="flex gap-20">
            <span className="logo">SG</span>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/education">Education</Link>
            <Link to="/contact">Contact</Link>

            {user ? (
              <div className="flex gap-20">
                <button className="button" onClick={logout}>Log Out</button>
              </div>
            ) : (
              <div className="flex gap-20">
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}