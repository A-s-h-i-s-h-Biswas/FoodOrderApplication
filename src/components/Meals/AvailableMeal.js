import Container from "./Container";
import "./Available.css";
import { useEffect, useState } from "react";

const AvailabelMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const response = await fetch(
        "https://food-ordering-app-1cbcc-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseMeal = await response.json();
      const loadedMeals = [];
      for (const key in responseMeal) {
        loadedMeals.push({
          id: key,
          img: responseMeal[key].img,
          type: responseMeal[key].type,
          title: responseMeal[key].title,
          price: responseMeal[key].price,
          rating: responseMeal[key].rating,
          description: responseMeal[key].description,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };
    fetchMeals().catch((error) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (loading) {
    return (
      <setion>
        <p className="loading">Loading Meals.......</p>
      </setion>
    );
  }
  if (httpError) {
    return (
      <setion>
        <p className="http-error">Oops! fail to load meals</p>
      </setion>
    );
  }
  return (
    <div className="meal-container">
      {meals.map((meal) => {
        return (
          <Container
            className="container-padding"
            key={meal.id}
            id={meal.id}
            title={meal.title}
            type={meal.type}
            price={meal.price}
            rating={meal.rating}
            img={meal.img}
            description={meal.description}
          />
        );
      })}
    </div>
  );
};
export default AvailabelMeals;
