import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [activeTab, setActiveTab] = useState("ingredients");

  const API_KEY = process.env.REACT_APP_API_KEY;
  let params = useParams();

  const getFullRecipe = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY}`
    );
    const data = await res.json();
    setRecipeDetails(data);
    console.log(data);
  };

  useEffect(() => {
    getFullRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  //

  return (
    <Wrapper>
      <Flex>
        <div>
          <h2>{recipeDetails.title}</h2>
          <img src={recipeDetails.image} alt={recipeDetails.title} />
        </div>
        <Info>
          <Button
            onClick={() => setActiveTab("ingredients")}
            className={activeTab === "ingredients" ? "active" : ""}
          >
            Ingredients
          </Button>
          <Button
            onClick={() => setActiveTab("instructions")}
            className={activeTab === "instructions" ? "active" : ""}
          >
            Instructions
          </Button>
          <div>
            {activeTab === "ingredients" && (
              <ul>
                {recipeDetails.extendedIngredients.map((item) => {
                  return <li>{item.original}</li>;
                })}
              </ul>
            )}

            {activeTab === "instructions" && (
              <ol>
                {recipeDetails.analyzedInstructions[0].steps.map((step) => {
                  return <li>{step.step}</li>;
                })}
              </ol>
            )}
          </div>
        </Info>
      </Flex>
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

const Flex = styled.div`
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  img {
    max-width: 450px;
  }

  h2 {
    margin-bottom: 2rem;
  }

  ol,
  ul {
    margin-top: 2rem;
  }

  ol li {
    font-weight: 600;
  }

  li {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 400;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    text-align: center;

    ul,
    ol {
      text-align: start;
      width: 80%;
      margin-inline: auto;
    }
  }
`;

const Info = styled.div`
  margin-left: 10rem;
  @media (max-width: 1200px) {
    margin: 0;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

export default Recipe;