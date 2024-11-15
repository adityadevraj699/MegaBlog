import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false); // Close the menu when scrolling
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-gray-800 shadow-md py-4 relative z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-xl font-bold">
            <Logo width="120px" />
          </Link>

          {/* Menu Toggle Button for Mobile */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Navigation Links */}
          <ul
            className={`fixed top-0 left-0 h-screen w-3/4 bg-gray-800 text-white space-y-6 p-6 transform ${
              isMenuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            } transition-transform duration-300 lg:static lg:flex lg:transform-none lg:space-y-0 lg:space-x-8 lg:p-0 lg:h-auto lg:w-auto`}
            style={{ zIndex: 50 }} // Ensure the menu has high z-index
          >
            {/* Logo in Mobile Menu */}
            <div className="lg:hidden mb-6">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl font-bold"
              >
                <Logo width="100px" />
              </Link>
            </div>

            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMenuOpen(false); // Close menu on navigation
                      }}
                      className="block w-full text-left lg:inline-block px-4 py-2 duration-200 hover:bg-blue-600 rounded-lg"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li onClick={() => {
                setIsMenuOpen(false);
              }}>
               
                  
                  
                
                  <LogoutBtn />
               
              </li>
            )}
          </ul>

          {/* Backdrop for mobile menu */}
          {isMenuOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
