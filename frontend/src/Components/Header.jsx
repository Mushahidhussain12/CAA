import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ setsidebarstate }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {

    // Perform logout actions here
    // For example, clear user data from localStorage and navigate to login page
    localStorage.removeItem('user-Threads');
    navigate('/');
    navigate('/');
    navigate('/');
  };

  return (
    <header style={{ position: "fixed" }} className="header-body p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a onClick={() => setsidebarstate("airport")} href="#" className="nav-link px-2 text-secondary">
                Airports
              </a>
            </li>
            <li>
              <a onClick={() => setsidebarstate("airline")} href="#" className="nav-link px-2 text-white">
                Airlines
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setsidebarstate("BayDisplay")} className="nav-link px-2 text-white">
                Bays
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setsidebarstate("flights")} className="nav-link px-2 text-white">
                Flights
              </a>
            </li>
            <li>
              <a onClick={() => setsidebarstate("schedule")} href="#" className="nav-link px-2 text-white">
                Schedule
              </a>
            </li>
          </ul>

          <form
            className="form col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <Button
              isLoading={loading}
              onClick={handleLogout}
              bg="red.500"
              color="white"
              _hover={{ bg: "red.600" }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
