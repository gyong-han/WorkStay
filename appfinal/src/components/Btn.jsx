import React, { Children } from "react";
import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => {
    return props.w || "300px";
  }};
  height: ${(props) => {
    return props.h || "60px";
  }};
  background-color: ${(props) => {
    return props.bg || "var(--main-color)";
  }};
  color: ${(props) => {
    return props.c || "#FAFAFA";
  }};
  border: ${(props) => {
    return props.b || "1px solid #049DD9";
  }};
  font-size: ${(props) => {
    return props.size || "1.5rem";
  }};
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
`;

const Btn = ({ children, w, bg, h, b, c, size,f }) => {
  return (
    <Button  onClick={f} bg={bg} w={w} h={h} b={b} c={c} size={size}>
      {children}
    </Button>
  );
};

export default Btn;
