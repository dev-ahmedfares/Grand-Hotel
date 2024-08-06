import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledAside = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/ -1;
  padding: 3.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledAside>
  );
}

export default Sidebar;
