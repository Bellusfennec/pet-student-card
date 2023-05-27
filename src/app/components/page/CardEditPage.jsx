/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import TextField from "../common/form/TextField";
import {
  createForm,
  formToData,
  totalValidatorForm,
  validatorForm,
} from "../../utils/form";
import { useNavigate } from "react-router-dom";
import Modal from "../common/modal/modal";

const CardEditPage = (props) => {
  const { card, setCard } = props;
  const navigate = useNavigate();
  const validateConfig = {
    firstName: { isRequared: "" },
    lastName: { isRequared: "" },
    birthDate: { isRequared: "", isYear: "" },
    portfolio: { isRequared: "", isHttp: "" },
  };
  const INITIAL_CARD_FORM = createForm(card);
  const [cardForm, setCardForm] = useState(INITIAL_CARD_FORM);
  const [error, setError] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handlerChangeCardForm = (event) => {
    const { value, name } = event.target;
    const form = { ...cardForm, [name]: { ...cardForm[name], value } };
    setCardForm(validatorForm(form, validateConfig));
    setError(totalValidatorForm(cardForm));
  };

  const handlerSendCardForm = (event) => {
    event.preventDefault();

    const data = formToData(cardForm);
    if (!error) {
      localStorage.setItem("card", JSON.stringify(data));
      setCard(data);
      setOpenModal(true);
    }
  };

  const handlerRemoveCardForm = () => {
    setCard();
    localStorage.removeItem("card");
    navigate(`/`);
  };

  return (
    <>
      <h2>Новая карта</h2>
      <form>
        <TextField
          label={cardForm.firstName.label}
          value={cardForm.firstName.value}
          name={cardForm.firstName.name}
          onChange={handlerChangeCardForm}
          error={cardForm.firstName.error}
        />
        <TextField
          label={cardForm.lastName.label}
          value={cardForm.lastName.value}
          name={cardForm.lastName.name}
          onChange={handlerChangeCardForm}
          error={cardForm.lastName.error}
        />
        <TextField
          label={cardForm.birthDate.label}
          value={cardForm.birthDate.value}
          name={cardForm.birthDate.name}
          type="number"
          onChange={handlerChangeCardForm}
          error={cardForm.birthDate.error}
        />
        <TextField
          label={cardForm.portfolio.label}
          value={cardForm.portfolio.value}
          name={cardForm.portfolio.name}
          onChange={handlerChangeCardForm}
          error={cardForm.portfolio.error}
        />
        <div className="d-grid gap-2 d-md-flex mt-3 justify-content-between">
          <button className="btn btn-secondary" onClick={() => navigate(`/`)}>
            Назад
          </button>

          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handlerRemoveCardForm}
          >
            Удалить
          </button>
          <button
            className="btn btn-primary"
            disabled={error}
            onClick={handlerSendCardForm}
          >
            Обновить
          </button>
        </div>
      </form>
      <Modal open={openModal}>
        <p className="m-3">Обновлено!</p>
        <hr />
        <div className="m-3 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/`)}
          >
            Закрыть
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CardEditPage;
