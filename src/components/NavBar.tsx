import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignUpModal from "./SignupModal";

import { FcSearch } from "react-icons/fc";

import LogoPng from "../assets/icons/logo.png";
import LoginModal from "./LoginModal";
import { Toaster } from "react-hot-toast";
import UserNavbarItem from "./UserNavbar";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff4500;
  padding: 0px 20px;
  color: white;

  position: sticky;
  top: 0;
  z-index: 1;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const MenuItem = styled.li`
  cursor: pointer;
  &:hover {
    color: #ddd;
  }
`;

const Search = styled.input`
  border-radius: 10px;
  width: 450px;
  height: 40px;
  border: 0;
  padding-left: 35px;

  font-size: 20px;
`;

const Button = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 10px;
  padding: 7px 13px;

  font-size: 15px;
  cursor: pointer;

  &:hover {
    scale: 1.1;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(FcSearch)`
  position: absolute;
  scale: 1.3;
  left: 8px;
`;

const Navbar: React.FC = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [search, setSearch] = useState("");

  const [isSignIn, setIsSignIn] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const localUsername = localStorage.getItem("username");
    if (localUsername) {
      setUsername(localUsername);
    }
  }, [isSignIn, isLogIn]);

  useEffect(() => {
    localStorage.setItem("searchPost", search);
  }, [search]);

  return (
    <NavBar>
      <Toaster />
      <SignUpModal
        isOpen={isSignIn}
        onCloseModal={() => {
          setIsSignIn(false);
        }}
      />
      <LoginModal
        isOpen={isLogIn}
        onCloseModal={() => {
          setIsLogIn(false);
        }}
      />
      <Logo>Dappe</Logo>
      {/* <SearchContainer>
        <SearchIcon />
        <Search
          placeholder="Search post..."
          onChange={(item) => setSearch(item.target.value)}
        />
      </SearchContainer> */}
      <Menu>
        {!username ? (
          <>
            <Button onClick={() => setIsSignIn(true)}>Sign up</Button>
            <Button onClick={() => setIsLogIn(true)}> Log In</Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                localStorage.clear();
                setUsername("");
              }}
            >
              Log out
            </Button>
            <UserNavbarItem userName={username} />
          </>
        )}
      </Menu>
    </NavBar>
  );
};

export default Navbar;
