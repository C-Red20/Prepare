// Header.jsx
import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../Managers/UserProfileManager.jsx";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <Navbar color="light" light expand="md" fixed="top">
      <Container className="d-flex justify-content-between align-items-center">
        <NavbarBrand tag={RRNavLink} to="/">
          Prepare
        </NavbarBrand>
        <Collapse isOpen={isOpen} navbar className="mx-auto">
          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/items">
                    Items
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories">
                    Categories
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/lists">
                    List
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <a
              aria-current="page"
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </a>
          ) : (
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/register">
                  Register
                </NavLink>
              </NavItem>
            </>
          )}
        </div>
        <NavbarToggler onClick={toggle} />
      </Container>
    </Navbar>
  );
}
