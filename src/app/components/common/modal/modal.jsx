import React from "react";
import style from "./modal.module.scss";

const Modal = (props) => {
  const { children, open } = props;

  return (
    <div className={style.modal + (open ? " " + style.modalOpen : "")}>
      <div className={style.modalBody}>{children}</div>
    </div>
  );
};

export default Modal;
