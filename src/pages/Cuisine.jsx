import { useEffect, useState } from "react";
import styled from "styled-components";
// import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import noImage from "../no-image.jpg";

function Cuisine() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const params = useParams();
  const [cuisine, setCuisine] = useState([]);
  const getCuisine = async (name) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${name}`
    );
    const data = await res.json();
    setCuisine(data.results);
  };

  useEffect(() => {
    getCuisine(params.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.type]);

  return (
    <Wrapper>
      <Grid>
        {cuisine.map((item) => {
          return (
            <Card key={item.id}>
              <img src={item.image ? item.image : noImage} alt={item.title} />
              <h4>{item.title}</h4>
            </Card>
          );
        })}
      </Grid>
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
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  h4 {
    text-align: center;
    padding: 1rem;
  }
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
`;

export default Cuisine;
