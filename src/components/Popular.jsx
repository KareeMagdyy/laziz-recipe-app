import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

function Popular() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPopular = async () => {
    const checkStorage = localStorage.getItem("popular");
    if (checkStorage) {
      setPopular(JSON.parse(checkStorage));
    } else {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10`
      );
      const data = await res.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our Popular Picks</h3>
        <Splide
          options={{
            perPage: 3,
            drag: "free",
            arrows: false,
            pagination: false,
            gap: "3rem",
            type: "loop",
            lazyLoad: "nearby",
            breakpoints: {
              768: {
                perPage: 2,
              },
              460: {
                perPage: 1,
              },
            },
          }}
        >
          {popular.map((recipe) => {
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
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  position: relative;

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

export default Popular;
