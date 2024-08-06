import { createContext, useContext, useEffect, useState } from "react";

import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useCabins } from "../features/cabins/useCabins";
import { useFilterCabin } from "../hooks/useFilterCabin";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);


  z-index: 1000;
  ${(props) =>
    props.left === "true"
      ? `bottom: -5%;right: 33px;display:flex`
      : `top: -10%;
  right: 30px; `}
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  ${(props) =>
    props.left === "true"
      ? `padding: 1.2rem 1.5rem;gap:0;`
      : `padding: 1.2rem 2.4rem;`}

  &:hover {
    background-color: var(--color-grey-50);
    svg {
      color: var(--color-brand-600);
    }
  }
  & span {
    white-space: nowrap
  }
  &:focus svg,
  &:active svg {
    color: var(--color-brand-600);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export function useMenusContext() {
  const context = useContext(MenusContext);

  if (!context) throw new Error("Menus Context Must be used within Menus");
  return context;
}

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;

  //For Add new Position for last to Table Body
  const [cabinIndex, setCabinIdx] = useState(null);
  useEffect(() => {
    if (openId === "") setCabinIdx(0);
  }, [openId]);

  return (
    <MenusContext.Provider
      value={{
        openId,
        close,
        open,
        position,
        setPosition,
        setCabinIdx,
        cabinIndex,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, cabinIdx }) {
  const { openId, open, close, setPosition, setCabinIdx } = useMenusContext();

  function handleClick(e) {
    e.stopPropagation();

    setCabinIdx(cabinIdx);
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { openId, close, cabinIndex } = useMenusContext();

  
  const {filterCabins : cabins} = useFilterCabin()

  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  const isIdx =
    cabinIndex === cabins.length - 1 ||  cabinIndex === cabins.length - 2;

  return (
    <StyledList left={`${isIdx}`} ref={ref}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClick, disabled = false }) {

  // Just for fix last Button overflow instead of use Portal
  const { close ,cabinIndex} = useMenusContext();
  const {filterCabins : cabins} = useFilterCabin()
  const isIdx =
  cabinIndex === cabins.length - 1 ||  cabinIndex === cabins.length - 2;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton left={`${isIdx}`} disabled={disabled} onClick={handleClick}>
        {icon}
        <span>{isIdx ? null : children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
