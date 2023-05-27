import { Navigate, useParams } from "react-router-dom";
import CardEditPage from "../components/page/CardEditPage";
import CardCreatePage from "../components/page/CardCreatePage";
import CardPage from "../components/page/CardPage";
import { useEffect, useState } from "react";

const Card = () => {
  const { action } = useParams();
  const edit = action === "edit";
  const create = action === "create";

  const [card, setCard] = useState();

  useEffect(() => {
    getCard();
  }, []);

  const getCard = () => {
    try {
      const cardData = JSON.parse(localStorage.getItem("card"))
        ? JSON.parse(localStorage.getItem("card"))
        : false;
      if (cardData) setCard(cardData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow mt-5 p-4">
          {!create && !edit && <CardPage card={card} />}
          {edit && card && <CardEditPage card={card} setCard={setCard} />}
          {edit && !card && <Navigate to="/" />}
          {create && <CardCreatePage setCard={setCard} />}
        </div>
      </div>
    </div>
  );
};

export default Card;
