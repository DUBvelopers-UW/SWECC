import React, { useEffect, useState } from 'react';
import '../CSS/Navbar.css';
import { CSSTransition } from 'react-transition-group';
import SWECClogo from '../Data/img/SWECClogo.jpg';
import { NavLink } from 'react-router-dom';

import { FaInstagram, FaLinkedin, FaDiscord, FaUsers, FaChevronRight } from 'react-icons/fa';
import { FcShare, FcCalendar, FcAbout, FcHome } from 'react-icons/fc';
import { IoHome } from 'react-icons/io5';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { MdGroupAdd } from 'react-icons/md';
import { BiInfoCircle } from 'react-icons/bi';
import { ImSun } from 'react-icons/im';
import { PiMoonBold } from 'react-icons/pi';
import { LuBell, LuMail, LuChevronDown, LuArrowLeft } from 'react-icons/lu'

import Switch from "./Switch.js";

function Navbar() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    if (darkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
    setDarkMode(!darkMode);
  };

  const [expand, setExpand] = useState(false);

  const togglExpand = () => {
    setExpand(!expand);
  }

  const closeExpand = () => {
    setExpand(false);
  }

  return (
    <NavBar className={`${darkMode ? 'dark-mode' : ''}`}>
      <NavItem icon={<NavLink to="/"><img className="swecc-logo" src={SWECClogo} alt="SWECC Logo" ></img></NavLink>} route={"/"} closeExpand={closeExpand} />
      <NavToggle icon={<ImSun />} /><Switch toggleMode={toggleMode} /><NavToggle icon={<PiMoonBold />} />
      {!isMobile &&
        <>
          <NavItem icon={<FcHome />} route={"/"} closeExpand={closeExpand} tooltip="Home" />
          <NavItem icon={<FcCalendar />} route={"/Events"} closeExpand={closeExpand} tooltip="Events" ></NavItem>
          <NavItem icon={<FcAbout />} route={"/About"} expand={expand} closeExpand={closeExpand} tooltip="About" />
          <NavItem icon={<MdGroupAdd />} route={"/Join-Now"} expand={expand} closeExpand={closeExpand} tooltip="Join" />
        </>
      }
      <NavExpandItem icon={<LuChevronDown />} expand={expand} togglExpand={togglExpand} closeExpand={closeExpand} tooltip="More" >
        <DropdownMenu closeExpand={closeExpand} />
      </NavExpandItem>
    </NavBar>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavToggle(props) {
  return (
    <li className="nav-item no-action" onClick={props.closeExpand}>
      <div className="icon-button no-action">{props.icon}</div>
    </li>
  );
}

function NavItem(props) {
  const { tooltip } = props;

  return (
    <li className="nav-item" onClick={props.closeExpand}>
      <NavLink to={props.route}>
        <div className={"icon-button" + (tooltip ? " tooltip" : "")} data-tooltip={tooltip}>
          {props.icon}
        </div>
      </NavLink>
    </li>
  );
}

function NavExpandItem(props) {

  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <div className="icon-button" onClick={props.togglExpand}>
        {props.icon}
      </div>
      {props.expand && props.children}
    </li>
  );
}

function DropdownMenu(props) {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function getHeight(elem) {
    const height = elem.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>

      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={getHeight}>
        <div className="menu">
          <NavLink to="/" onClick={props.closeExpand}>
            <DropdownItem leftIcon={<IoHome />}>Home</DropdownItem>
          </NavLink>
          <NavLink to="/About" onClick={props.closeExpand} >
            <DropdownItem leftIcon={<BiInfoCircle />} >About</DropdownItem>
          </NavLink>
          <NavLink to="/Events" onClick={props.closeExpand} >
            <DropdownItem leftIcon={<RiCalendarTodoFill />} >Events</DropdownItem>
          </NavLink>
          <NavLink to="/Join-Now" onClick={props.closeExpand} >
            <DropdownItem leftIcon={<FaUsers />} >Join Now</DropdownItem>
          </NavLink>
          <DropdownItem
            leftIcon={<LuBell />}
            url={"http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist"}>
            Subscribe to our newsletter
          </DropdownItem>
          <DropdownItem
            leftIcon={<FcShare />}
            rightIcon={<FaChevronRight style={{ padding: 10 }} />}
            goToMenu="socials">
            Social Media
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "socials"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={getHeight}>

        <div className="menu">
          <DropdownItem leftIcon={<LuArrowLeft />} goToMenu="main"></DropdownItem>
          <DropdownItem
            leftIcon={<FaDiscord />}
            url={"https://discord.gg/Pbk4sCEWDY"}>
            Discord
          </DropdownItem>

          <DropdownItem
            leftIcon={<FaInstagram />}
            url={"https://www.instagram.com/swecc.uw/"}>
            Instagram
          </DropdownItem>

          <DropdownItem
            leftIcon={<FaLinkedin />}
            url={"https://www.linkedin.com/company/software-engineering-career-club-at-uw/"}>
            LinkedIn
          </DropdownItem>

          <DropdownItem
            leftIcon={<LuMail />}
            url={"mailto:swecc@uw.edu"}>
            Email
          </DropdownItem>
        </div>

      </CSSTransition>

    </div>
  )
}

export default Navbar;