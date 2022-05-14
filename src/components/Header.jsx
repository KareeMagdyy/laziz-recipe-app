import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

function Header() {
  return (
    <Wrapper>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>Lazeeez</Logo>
        <Link to={"/liked"}>Liked</Link>
      </Nav>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  margin: 2rem 0;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  position: relative;
  text-align: center;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 920px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-family: "Lobster Two", cursive;
`;
const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;
