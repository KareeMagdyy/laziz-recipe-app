import veganImg from "../image/vegan.png";
import vegetarianImg from "../image/vegetarian.png";
import dairyFreeImg from "../image/dairy-free.png";
import glutenFreeImg from "../image/gluten-free.png";
import fodMapImg from "../image/fodmap.png";
import styled from "styled-components";

function Facts(props) {
  return (
    <Div>
      {props.isVegetarian && (
        <img className='facts-img' src={vegetarianImg} alt='vegetarian' />
      )}
      {props.isDairyFree && (
        <img className='facts-img' src={dairyFreeImg} alt='diary free' />
      )}
      {props.isGlutenFree && (
        <img className='facts-img' src={glutenFreeImg} alt='gluten free' />
      )}
      {props.isVegan && (
        <img className='facts-img' src={veganImg} alt='vegan' />
      )}
      {props.isFodMap && (
        <img className='facts-img' src={fodMapImg} alt='fod map' />
      )}
    </Div>
  );
}

export default Facts;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .facts-img {
    display: inline-block;
    max-width: 100%;
    width: 50px;
    margin-top: 1.5rem;
  }
`;
