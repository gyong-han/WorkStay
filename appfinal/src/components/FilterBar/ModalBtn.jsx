import React from "react";

const ModalBtn = ({ f, str,disabled}) => {
  return (
    <>
      <button onClick={f} disabled={disabled}>{str}</button>
    </>
  );
};

export default ModalBtn;
