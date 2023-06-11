import React from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

const NavItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled(FaUserCircle)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const UserNavbarItem = ({ userName }: { userName: string }) => {
  return (
    <NavItemContainer>
      <Avatar />
      <UserName>{userName}</UserName>
    </NavItemContainer>
  );
};

export default UserNavbarItem;
