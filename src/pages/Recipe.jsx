import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Facts from "../components/Facts";

function Recipe(props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [activeTab, setActiveTab] = useState("ingredients");
  const [analyzedInstructions, setAnalyzedInstructions] = useState([]);
  const [nutritionDetails, setNutritionDetails] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  let params = useParams();

  //request Full Recipe Details by recipe ID
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
  // Request Instruction Steps by recipe ID
  const getAnalyzedInstructions = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/analyzedInstructions?apiKey=${API_KEY}`
    );
    const data = await res.json();
    setAnalyzedInstructions(data[0].steps);
  };
  //Request Nutrition by recipe ID
  const getNutritionDetails = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/nutritionWidget.json?apiKey=${API_KEY}`
    );
    const data = await res.json();
    setNutritionDetails(data);
  };

  useEffect(() => {
    getFullRecipe();
    getAnalyzedInstructions();
    getNutritionDetails();
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

  const goodNutrition = (nutritionDetails.good || []).map((item) => (
    <li key={uuidv4()}>
      {item.title}: {item.amount}
    </li>
  ));

  const badNutrition = (nutritionDetails.bad || []).map((item) => (
    <li key={uuidv4()}>
      {item.title}: {item.amount}
    </li>
  ));

  return (
    <Wrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {recipeDetails.status !== "failure" &&
      Object.keys(recipeDetails).length !== 0 ? (
        <div>
          <Flex>
            <div>
              <h2>{recipeDetails.title}</h2>
              <img src={recipeDetails.image} alt={recipeDetails.title} />
              <Facts
                isVegetarian={recipeDetails.vegetarian}
                isVegan={recipeDetails.vegan}
                isDairyFree={recipeDetails.dairyFree}
                isGlutenFree={recipeDetails.glutenFree}
                isFodMap={recipeDetails.lowFodmap}
              />
            </div>
            <Info>
              <div className='btns'>
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

                {props.LikedArray.includes(recipeDetails.id) ? (
                  <FcLike onClick={() => props.removeLike(recipeDetails.id)} />
                ) : (
                  <FcLikePlaceholder
                    onClick={() => props.addLike(recipeDetails.id)}
                  />
                )}
              </div>

              <div>
                {activeTab === "ingredients" && (
                  <MyList>
                    <ul>{ingredientsDetailed}</ul>
                  </MyList>
                )}
                {activeTab === "instructions" && (
                  <MyList>
                    <ol>{instructionsDetailed}</ol>
                  </MyList>
                )}
              </div>
            </Info>
          </Flex>
          <Nutrition>
            <h3>Nutrition</h3>
            <Flex>
              <ul>
                <h4>Summary</h4>
                <li>Calories: {nutritionDetails.calories}</li>
                <li>Carbs: {nutritionDetails.carbs}</li>
                <li>Fats: {nutritionDetails.fat}</li>
                <li>Protein: {nutritionDetails.protein}</li>
              </ul>
              <ul>
                <h4>Good Nutrition</h4>
                {goodNutrition}
              </ul>

              <ul>
                <h4>Bad Nutrition</h4>
                {badNutrition}
              </ul>
            </Flex>
          </Nutrition>
        </div>
      ) : recipeDetails.code === 401 || recipeDetails.code === 402 ? (
        <h3 className='errMsg'>Limit Exceeded Try Again Tomorrow</h3>
      ) : recipeDetails.code === 404 ? (
        <h3 className='errMsg'>
          <span>404 | </span>Page not found
        </h3>
      ) : (
        <h3 className='errMsg'>Cooking</h3>
      )}
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

  .errMsg {
    text-align: center;
    border: 2px solid #000;
    width: fit-content;
    padding: 3rem;
    margin: 1rem auto;

    span {
      font-weight: 600;
      font-size: 1.5em;
    }
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 3rem;
  border-bottom: 2px solid #494949;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  img {
    width: 100%;
    max-width: 450px;
  }

  h2 {
    margin-bottom: 2rem;
    max-width: 25ch;
  }

  ol,
  ul {
    margin-top: 2rem;
  }

  ol li {
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 400;
    max-width: 30ch;
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

const MyList = styled.div`
  padding-left: 2rem;
  padding-right: 1rem;
  margin-top: 2rem;
  max-height: 25rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 5px;
  }
`;

const Info = styled.div`
  margin-left: 10rem;

  .btns {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  svg {
    font-size: 2.5rem;
    cursor: pointer;
    border: 2px solid #000;
    padding: 0.2rem;
    border-radius: 0.3rem;
    width: 50px;
    height: 50px;
  }

  @media (max-width: 1200px) {
    margin: 0;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: #fff;
  border: 2px solid #000;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.3rem;
`;

const Nutrition = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  div {
    @media (min-width: 900px) {
      align-items: flex-start;
      justify-content: space-around;
      flex-direction: row;
    }

    @media (max-width: 900px) {
      flex-direction: column;
      justify-content: center;
    }
  }

  ul {
    padding-left: 1.5rem;
    margin: 0 auto;

    h4 {
      margin: 0.5rem 0;
      text-decoration: underline;
      font-size: 1.3rem;
    }

    li {
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }
  }
`;

export default Recipe;
