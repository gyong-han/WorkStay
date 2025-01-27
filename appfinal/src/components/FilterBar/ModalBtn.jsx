import React from "react";

const ModalBtn = ({ f, str }) => {
  return (
    <>
      <button onClick={f}>{str}</button>
    </>
  );
};

export default ModalBtn;
