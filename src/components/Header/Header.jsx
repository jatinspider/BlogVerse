import { Container, Logoutbtn, LogoComponenet } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData); // Get userData from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To manage dropdown state

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-[#002C54] py-4 shadow-lg fixed top-0 w-full z-40">
      <Container>
        <nav className="flex items-center justify-between relative">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/">
              <LogoComponenet width="70px" />
            </Link>
            <button
              className="md:hidden text-[#C5001A]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <ul
            className={`absolute top-full left-0 w-full bg-[#002C54] md:static md:flex md:space-x-4 md:bg-transparent transition-transform transform ${
              isMenuOpen ? "block" : "hidden"
            } `}
          >
            <li className="md:hidden flex justify-end">
              <button
                className="text-[#C5001A] p-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="flex">
                  <button
                    onClick={() => navigate(item.slug)}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#083c69] rounded-md group-hover:bg-opacity-0">
                      {item.name}
                    </span>
                  </button>
                </li>
              ) : null
            )}
          </ul>

          {/* User Profile Dropdown */}
          {authStatus && userData && (
            <div className="relative">
              {/* Round button with first letter of username */}
              <button
                className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white text-xl hover:bg-pink-950"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {userData.name.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-1 w-48 bg-white text-black rounded-lg shadow-lg z-10">
                  <li className="p-2 font-semibold text-start hover:bg-slate-400 w-full">
                     {userData.name}
                  </li>
                    <li className="p-2 font-semibold text-gray-600 text-start hover:bg-slate-400">
                     {userData.email}
                    </li>
                  <li className="border-t border-gray-200">
                    <Logoutbtn/>
                  </li>
                </ul>
              )}
            </div>
          )}

         
        </nav>
      </Container>
    </header>
  );
}

export default Header;



