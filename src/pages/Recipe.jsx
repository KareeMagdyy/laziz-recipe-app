import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function Recipe() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [activeTab, setActiveTab] = useState("ingredients");
  const [analyzedInstructions, setAnalyzedInstructions] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  let params = useParams();

  const getFullRecipe = async () => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY}`
      );
      const data = await res.json();
      setRecipeDetails(data);
    } catch (err) {
      console.error("Recipe API", err);
    }
  };

  const getAnalyzedInstructions = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/analyzedInstructions?apiKey=${API_KEY}`
    );
    const data = await res.json();
    setAnalyzedInstructions(data[0].steps);
  };

  useEffect(() => {
    getFullRecipe();
    getAnalyzedInstructions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const ingredientsDetailed = (recipeDetails.extendedIngredients || []).map(
    (ingredient) => {
      return <li key={uuidv4()}>{ingredient.original}</li>;
    }
  );

  const instructionsDetailed = analyzedInstructions.map((instruction) => {
    return <li key={uuidv4()}>{instruction.step}</li>;
  });

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
            {activeTab === "ingredients" && <ul>{ingredientsDetailed}</ul>}
            {activeTab === "instructions" && <ol>{instructionsDetailed}</ol>}
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
    max-width: 30ch;
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
