import { useEffect, useState, useRef } from "react";
import { Navbar, Collapse, Button, IconButton } from "@material-tailwind/react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "@img/logo_new.png";
import "./styles.css";
import Typography from "../Typography/Typography";
import { Color } from "@/constants/Colors";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navbarClasses = `navbar ${!isHomePage ? "navbar-solid" : ""}`;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        console.log("clicke outsisde@@");
        setOpenNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNav]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const toggleOpen = () => setOpenNav((cur) => !cur);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography color={Color.blueGray}>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </Typography>
      <Typography color={Color.blueGray}>
        <NavLink to="/menu" className="nav-link">
          Menu
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <div className={navbarClasses + (scrolled ? " scrolled" : "")}>
      <Navbar className="sticky lg:px-8 lg:py-4">
        <div className="flex items-center justify-between ">
          <Typography as="a" href="#" className="navbar-brand">
            <img src={logo} alt="logo" className="resized-image" />
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <a
              href="https://www.ubereats.com/store/the-grove/V5b6eckMWgqyTg5gj0dpXg?"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-block"
            >
              <Button
                variant="gradient"
                size="sm"
                className="bg-orange-500 text-white p-2 rounded-md text-xs hidden lg:inline-block hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              >
                <span>Order Online</span>
              </Button>
            </a>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={toggleOpen}
            >
              {openNav ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </IconButton>
          </div>
        </div>
        {openNav ? (
          <Collapse open={false} ref={mobileNavRef}>
            <div className="mobile-nav">
              {navList}
              <a
                href="https://www.ubereats.com/store/the-grove/V5b6eckMWgqyTg5gj0dpXg?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-auto"
              >
                <Button
                  variant="gradient"
                  size="sm"
                  className="bg-orange-500 text-white p-2 rounded-md text-xs w-55 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 mb-5 "
                >
                  <span>Order Online</span>
                </Button>
              </a>
            </div>
          </Collapse>
        ) : null}
      </Navbar>
    </div>
  );
};

export default NavBar;
