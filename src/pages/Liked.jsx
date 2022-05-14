import { motion } from "framer-motion";
import styled from "styled-components";
import { useState, useEffect } from "react";

function Liked(props) {
  const [likedQuery, setLikedQuery] = useState([]);
  const likedIds = props.LikedArray;
  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(likedQuery.length);

  const getLikedDetails = () =>
    likedIds.map((id) => {
      const getRecipe = async (id) => {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        const data = await res.json();
        setLikedQuery((prevData) => [...prevData, data]);
      };
      return getRecipe(id);
    });

  useEffect(() => {
    getLikedDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likedIds]);

  return (
    <Wrapper>
      <Grid>
        <Card>
          {/* {cuisine.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={`/recipe/${item.id}`}>
                <img src={item.image ? item.image : noImage} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })} */}
        </Card>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
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

export default Liked;
