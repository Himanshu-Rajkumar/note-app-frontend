"use client"

import { useState } from "react"
import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  position: sticky;
  top: 70px;
  z-index: 999;
`

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease;
  }
`

const NavLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) => (props.active ? "#667eea" : "#333")};
  transition: color 0.3s ease;
  border-bottom: ${(props) => (props.active ? "2px solid #667eea" : "none")};
  padding-bottom: 0.5rem;

  &:hover {
    color: #667eea;
  }
`

const MenuToggle = styled.button`
  display: none;
  background: none;
  font-size: 2rem;
  color: #333;

  @media (max-width: 768px) {
    display: block;
  }
`

const NavBar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/service", label: "Services" },
    { path: "/contact", label: "Contact" },
    { path: "/profile", label: "Profile" },
  ]

  return (
    <Nav>
      <NavContent>
        <NavLinks isOpen={isOpen}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} active={location.pathname === item.path} onClick={() => setIsOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </NavLinks>
        <MenuToggle onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas fa-${isOpen ? "times" : "bars"}`}></i>
        </MenuToggle>
      </NavContent>
    </Nav>
  )
}

export default NavBar
