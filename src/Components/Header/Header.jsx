import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/organiseEvent">
          Adolphus's Toxic Pages
        </a>
        {/* Add other navbar elements here */}
      </div>
    </nav>
  );
};

export default Header;
