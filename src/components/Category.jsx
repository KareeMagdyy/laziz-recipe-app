import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <Wrapper>
      <List>
        <NavLink to={"/cuisine/Italian"}>
          <FaPizzaSlice />
          <h4>Italian</h4>
        </NavLink>
        <NavLink to={"/cuisine/American"}>
          <FaHamburger />
          <h4>American</h4>
        </NavLink>
        <NavLink to={"/cuisine/Thai"}>
          <GiNoodles />
          <h4>Thai</h4>
        </NavLink>
        <NavLink to={"/cuisine/Japanese"}>
          <GiChopsticks />
          <h4>Japanese</h4>
        </NavLink>
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
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

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 2rem;
`;

export default Category;
