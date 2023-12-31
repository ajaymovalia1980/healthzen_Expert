/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import routes from "routes.js";
import { Container } from "react-bootstrap";
import Logo from "../../assets/img/logo.png";
import { useHistory } from "react-router-dom";
import ServiceStore from "../../util/ServiceStore";

function Header(props) {
  const [openMenu, setOpenMenu] = useState(false)
  let history = useHistory();

  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const pushToRoute = route => {
    history.push(route)
    setOpenMenu(false)
}
const user = localStorage.getItem("username")
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const SignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("loginuser");
    history.push("/login")
    
  };
  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
    
        <div className="navbar-wrapper">
          {/* <div className="sc-vw2xss-0 gKVBNK JS-fix-dialog-scroll">
        <div className="main-content">
        <a hasurl="/admin" className="sc-vw2xss-1 hUZEhA" href="/admin">
        <img
							src={Logo}
							alt="Logo"
							style={{  width:  '200px',
              height: '200px' ,marginTop:'-70px',marginBottom:"-80px"}}
						/>
            </a>
            <div className="title"><h6>Expert View</h6>
            <div>Administrator</div></div>
            <a className="sc-vw2xss-2 iHqffU" href="/admin/cases">Cases</a>
            <a className="sc-vw2xss-2 cicZNf" href="/admin/experts">Experts</a>
            </div>
        </div> */}
          {/* <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div> */}
          {/* <NavbarBrand href="/">{getBrand()}</NavbarBrand> */}
          <Navbar.Brand >
				
						<img
							src={Logo}
							alt="Logo"
							style={{  width:  '200px',
              height: '200px' ,marginTop:'-70px',marginBottom:"-80px"}}
						/>
					
				</Navbar.Brand>
        <div className="title"><h6>Expert View</h6>
            <div>Expert physician</div></div>
        </div>
        <div className="link-class ">
            <NavLink activeClassName="active-navbar"  to="/admin/Cases">
							Cases
						</NavLink>
            </div>
            {/* <div className="link-class2">
						<NavLink activeClassName="active-navbar" to="/admin/Experts" >
							Experts
						</NavLink>
            </div> */}
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          
          <Nav>
           
           
            {/* <NavItem>
              <Link to="#pablo" className="nav-link btn-rotate">
                <span>Riddhi</span>
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link>
            </NavItem> */}
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              
              <DropdownToggle caret nav>
              <p>
              <span>{user}</span>
              </p>
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <span className="drop-head"> Institution settings </span>
                {/* <DropdownItem className="kpCNCo" tag="a" onClick={() => pushToRoute("/admin/StaffManagement")}>Staff management</DropdownItem>
                <DropdownItem className="kpCNCo" tag="a" onClick={() => pushToRoute("/admin/AddDivision")}>Division settings</DropdownItem>
                <DropdownItem className="kpCNCo" tag="a">Notification settings</DropdownItem>
                <DropdownItem className="kpCNCo" tag="a">Audit log</DropdownItem>
                <span className="cuSMU"> Your profile </span>
                <DropdownItem className="kpCNCo" tag="a">Change Password</DropdownItem> */}
                <DropdownItem className="kpCNCo" tag="a" onClick={() => SignOut()}>Sign out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;
