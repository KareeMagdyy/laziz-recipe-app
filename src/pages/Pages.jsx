import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Liked from "./Liked";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Pages() {
  const [liked, setLiked] = useState(
    JSON.parse(localStorage.getItem("liked")) || []
  );

  const addLiked = (id) => {
    setLiked((prevLiked) => [...prevLiked, id]);
  };

  const removeLiked = (id) => {
    setLiked((prevLiked) => prevLiked.filter((like) => like !== id));
  };

  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked]);

  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/searched/:search' element={<Searched />} />
        <Route
          path='/recipe/:id'
          element={
            <Recipe
              addLike={addLiked}
              removeLike={removeLiked}
              LikedArray={liked}
            />
          }
        />
        <Route path='/liked' element={<Liked LikedArray={liked} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
