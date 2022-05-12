import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

function Veggie() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVeggie = async () => {
    const checkStorage = localStorage.getItem("vegetarian");
    if (checkStorage) {
      setVeggie(JSON.parse(checkStorage));
    } else {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=vegetarian`
      );
      const data = await res.json();
      localStorage.setItem("vegetarian", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 4,
            drag: "free",
            arrows: false,
            pagination: false,
            gap: "3rem",
          }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Card = styled.div`
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  min-height: 300px;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 300px;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
`;

export default Veggie;
