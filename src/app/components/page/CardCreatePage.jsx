/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createForm,
  formToData,
  totalValidatorForm,
  validatorForm,
} from "../../utils/form";
import TextField from "../common/form/TextField";
import Modal from "../common/modal/modal";

const CardCreatePage = (props) => {
  const { setCard } = props;
  const navigate = useNavigate();
  const validateConfig = {
    firstName: { isRequared: "" },
    lastName: { isRequared: "" },
    birthDate: { isRequared: "", isYear: "" },
    portfolio: { isRequared: "", isHttp: "" },
  };
  const INITIAL_CARD_FORM = createForm({
    firstName: "",
    lastName: "",
    birthDate: "",
    portfolio: "",
  });
  const [cardForm, setCardForm] = useState(INITIAL_CARD_FORM);
  const [error, setError] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setCardForm(validatorForm(INITIAL_CARD_FORM, validateConfig));
  }, []);

  const handlerChangeCardForm = (event) => {
    const { value, name } = event.target;
    const form = { ...cardForm, [name]: { ...cardForm[name], value } };
    setCardForm(validatorForm(form, validateConfig));
    setError(totalValidatorForm(form));
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
        <div className="mt-3">
          <button
            className="btn btn-primary"
            disabled={error}
            onClick={handlerSendCardForm}
          >
            Создать
          </button>
        </div>
      </form>
      <Modal open={openModal}>
        <p className="m-3">Сохранено!</p>
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

export default CardCreatePage;
