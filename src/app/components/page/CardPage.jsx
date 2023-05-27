import React from "react";
import { Link } from "react-router-dom";

const CardPage = (props) => {
  const { card } = props;

  const getAge = (number) => {
    if (!number) return;
    const age = new Date().getFullYear() - Number(number);
    let ageText = "лет";
    if (["1"].indexOf(String(age).at(-1)) !== -1) ageText = "год";
    if (["2", "3", "4"].indexOf(String(age).at(-1)) !== -1) ageText = "года";
    return `(${age} ${ageText})`;
  };

  return (
    <>
      <h1>Карточка студента</h1>
      {!card && (
        <div>
          <p>Нет данных</p>
          <Link to={"/create"} className="btn btn-primary">
            Добавить
          </Link>
        </div>
      )}
      {card && (
        <div>
          <p>
            <b>Имя:</b> {card?.firstName}
            <br />
            <b>Фамилия:</b> {card?.lastName}
            <br />
            <b>Год рождения:</b> {card?.birthDate} {getAge(card?.birthDate)}
            <br />
            <b>Портфолио</b>{" "}
            <a target="_blank" rel="noreferrer" href={card?.portfolio}>
              {card?.portfolio}
            </a>
          </p>
          <Link to={"/edit"} className="btn btn-primary">
            Редактировать
          </Link>
        </div>
      )}
    </>
  );
};

export default CardPage;
