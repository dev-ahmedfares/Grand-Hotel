import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoCalendarOutline } from "react-icons/io5";

import styled from "styled-components";
import { HiOutlineHomeModern, HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineSettingsSuggest } from "react-icons/md";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    font-size: 1.6rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:visited,
  &.active:link {
    background-color: var(--color-grey-50);
    color: var(--color-grey-800);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    transform: translateY(-2px);
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:visited svg,
  &.active:link svg {
    color: var(--color-brand-600);
  }

`;

function MainNav() {
  return (
    <NavList>
      <li>
        <StyledNavLink to={"/dashboard"}>
          <IoHomeOutline />
          <span>Home</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to={"/bookings"}>
          <IoCalendarOutline />
          <span>Booking</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to={"/cabins"}>
          <HiOutlineHomeModern />
          <span>Cabins</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to={"/users"}>
          <HiOutlineUsers />
          <span>Users</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to={"/settings"}>
          <MdOutlineSettingsSuggest />
          <span>Settings</span>
        </StyledNavLink>
      </li>
    </NavList>
  );
}

export default MainNav;
