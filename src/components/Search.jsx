import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${searchValue}`);
    setSearchValue("");
  };

  return (
    <Wrapper>
      <FormStyled onSubmit={submitHandler}>
        <div>
          <FaSearch></FaSearch>
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </FormStyled>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
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

const FormStyled = styled.form`
  margin-left: auto;
  margin-right: auto;
  min-width: 100%;

  div {
    width: 100%;
    max-width: 680px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: #fff;
    width: 100%;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    font-family: inherit;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(100%, -50%);
    color: #fff;
  }
`;

export default Search;
